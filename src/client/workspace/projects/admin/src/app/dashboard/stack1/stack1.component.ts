import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { uuid } from '../../../../../../../../../../main/src/utils';

const unique = (value, index, array) => array.indexOf(value) === index;

const log = (v) => {
  console.log({ v });
  return v;
};

@Component({
  selector: 'app-stack1',
  templateUrl: './stack1.component.html',
  styleUrls: ['./stack1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stack1Component implements OnInit, AfterViewInit {
  @Input()
  chart;

  @ViewChild('chartcontainer')
  chartcontainer: ElementRef;

  svg;

  height = 200;
  width = 400;

  margin = {
    top: 20,
    right: 10,
    bottom: 10,
    left: 80,
  };

  domain;
  series;
  color;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.domain = this.chart.category || this.chart.data.map((d) => d.category);
    this.series =
      this.chart.series || this.chart.data.map((d) => d.series).filter(unique);
    this.color = d3
      .scaleOrdinal()
      .domain(this.series)
      .range(d3.schemeTableau10);
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit');
    this.render();
  }

  render(): void {
    if (!this.chart) {
      return;
    }

    this.svg = d3
      .select(this.chartcontainer.nativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height);

    const nested = d3
      .nest()
      .key((d) => d.category)
      .key((d) => d.series)
      .rollup((d) => d.map((d) => d.volume).reduce((i, j) => i + j))
      .entries(this.chart.data)
      .map((d) => ({
        key: d.key,
        ...d.values
          .map((d) => ({ [d.key]: d.value }))
          .reduce((i, j) => ({ ...i, ...j }), {}),
      }));

    const stack = d3
      .stack()
      .keys(this.series)
      .value((d, key) => d[key] || 0)(nested)
      .map((d) => (d.forEach((v) => (v.key = d.key)), d));

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(stack, (d) => d3.max(d, (d) => d[1]))])
      .range([this.margin.left, this.width - this.margin.right]);

    const y = d3
      .scaleBand()
      .domain(this.domain)
      .range([this.margin.top, this.height - this.margin.bottom])
      .padding(0.1);

    this.svg
      .append('g')
      .selectAll('g')
      .data(stack)
      .join('g')
      .attr('fill', (d) => this.color(d.key))
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d, i) => y(d.data.key))
      .attr('width', (d) => x(d[1]) - x(d[0]))
      .attr('height', y.bandwidth())
      .append('title')
      .text((d) => `${d.key} (${d[1] - d[0]})`);

    this.svg
      .append('g')
      .attr('transform', `translate(0,${this.margin.top})`)
      .call(d3.axisTop(x));

    this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(y));

    this.cdr.markForCheck();
  }

  download(): void {
    const link = document.createElement('a');
    link.href =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.chart.data));
    link.download = `download-${uuid()}.json`;
    link.click();
  }
}
