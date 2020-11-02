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
  selector: 'app-bar1',
  templateUrl: './bar1.component.html',
  styleUrls: ['./bar1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bar1Component implements OnInit, AfterViewInit {
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

  constructor(private readonly cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    // console.log('ngOnInit');
  }

  async ngAfterViewInit(): Promise<void> {
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

    const domain =
      this.chart.category ||
      this.chart.data.map((d) => d.category).filter(unique);

    const color = d3.scaleOrdinal().domain(domain).range(d3.schemeTableau10);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(this.chart.data, (d) => d.volume)])
      .rangeRound([this.margin.left, this.width - this.margin.right]);

    const y = d3
      .scaleBand()
      .domain(domain)
      .range([this.margin.top, this.height - this.margin.bottom])
      .padding(0.1);

    this.svg
      .selectAll('rect')
      .data(this.chart.data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(0))
      .attr('y', (d) => y(d.category))
      .attr('height', y.bandwidth())
      .attr('width', (d) => x(d.volume) - x(0))
      .attr('fill', (d) => color(d.category))
      .append('title')
      .text((d) => `${d.category} (${d.volume})`);

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
