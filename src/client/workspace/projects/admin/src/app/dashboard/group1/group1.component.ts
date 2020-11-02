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
  selector: 'app-group1',
  templateUrl: './group1.component.html',
  styleUrls: ['./group1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Group1Component implements OnInit, AfterViewInit {
  @Input()
  chart;

  @ViewChild('chartcontainer')
  chartcontainer: ElementRef;

  svg;

  height = 200;
  width = 600;

  margin = {
    top: 20,
    right: 10,
    bottom: 20,
    left: 50,
  };

  domain;
  series;
  color;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.domain =
      this.chart.category ||
      this.chart.data.map((d) => d.category).filter(unique);
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

    const x = d3
      .scaleBand()
      .domain(this.domain)
      .range([this.margin.left, this.width - this.margin.right])
      .padding(0.1);

    const z = d3
      .scaleBand()
      .domain(this.series)
      .range([0, x.bandwidth()])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.chart.data, (d) => d.volume)])
      .range([this.height - this.margin.bottom, this.margin.top]);

    this.svg
      .append('g')
      .selectAll('rect')
      .data(this.chart.data)
      .join('rect')
      .attr('fill', (d) => this.color(d.series))
      .attr('x', (d) => x(d.category) + z(d.series))
      .attr('y', (d) => y(d.volume))
      .attr('width', (d) => z.bandwidth())
      .attr('height', (d) => y(0) - y(d.volume))
      .append('title')
      .text((d) => `${d.series} (${d.volume})`);

    this.svg
      .append('g')
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(x));

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
