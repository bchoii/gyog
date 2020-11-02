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
  selector: 'app-line1',
  templateUrl: './line1.component.html',
  styleUrls: ['./line1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Line1Component implements OnInit, AfterViewInit {
  @Input()
  chart;

  @ViewChild('chartcontainer')
  chartcontainer: ElementRef;

  svg;

  height = 200;
  width = 600;

  margin = {
    top: 10,
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
    log(this.domain);
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
      .scalePoint()
      .domain(this.domain)
      .range([this.margin.left, this.width - this.margin.right])
      .padding(0.4);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.chart.data, (d) => d.volume)])
      .range([this.height - this.margin.bottom, this.margin.top]);

    const get = (category, series) =>
      this.chart.data.find(
        (d) => d.category === category && d.series === series
      )?.volume;

    const filled = this.domain
      .map((category) =>
        this.series.map((series) => ({
          category,
          series,
          volume: get(category, series),
        }))
      )
      .flat();

    const nested = d3
      .nest()
      .key((d) => d.series)
      .key((d) => d.category)
      .rollup((d) => d.map((d) => d.volume).reduce((i, j) => i + j))
      .entries(filled);

    const line = d3
      .line()
      .defined((d) => d.value)
      .x((d) => x(d.key))
      .y((d) => y(d.value || 0));

    this.svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .selectAll('path')
      .data(nested)
      .join('path')
      .attr('stroke', (d) => this.color(d.key))
      .attr('d', (d) => line(d.values))
      .append('title')
      .text((d) => d.key);

    this.svg
      .append('g')
      .attr('fill', 'white')
      .attr('stroke-width', 2)
      .selectAll('circle')
      .data(this.chart.data)
      .join('circle')
      .attr('stroke', (d) => this.color(d.series))
      .attr('cx', (d) => x(d.category))
      .attr('cy', (d) => y(d.volume))
      .attr('r', 3)
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
