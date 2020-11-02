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
  selector: 'app-heat1',
  templateUrl: './heat1.component.html',
  styleUrls: ['./heat1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Heat1Component implements OnInit, AfterViewInit {
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
    bottom: 10,
    left: 80,
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
    const max = d3.max(this.chart.data, (d) => d.volume);
    this.color = d3
      .scaleSequential()
      .domain([0, max])
      .interpolator(d3.interpolateBlues);
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

    const y = d3
      .scaleBand()
      .domain(this.series)
      .range([this.margin.top, this.height - this.margin.bottom])
      .padding(0.1);

    const get = (category, series) =>
      this.chart.data.find(
        (d) => d.category === category && d.series === series
      )?.volume || 0;

    const filled = this.domain
      .map((category) =>
        this.series.map((series) => ({
          category,
          series,
          volume: get(category, series),
        }))
      )
      .flat();

    this.svg
      .append('g')
      .selectAll('rect')
      .data(filled)
      .join('rect')
      .attr('fill', (d) => this.color(d.volume))
      .attr('x', (d) => x(d.category))
      .attr('y', (d, i) => y(d.series))
      .attr('width', (d) => x.bandwidth())
      .attr('height', y.bandwidth())
      .append('title')
      .text((d) => `${d.category}, ${d.series} (${d.volume})`);

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
