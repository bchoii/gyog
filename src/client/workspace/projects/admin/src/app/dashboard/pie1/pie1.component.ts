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
  selector: 'app-pie1',
  templateUrl: './pie1.component.html',
  styleUrls: ['./pie1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pie1Component implements OnInit, AfterViewInit {
  @Input()
  chart;

  @ViewChild('chartcontainer')
  chartcontainer: ElementRef;

  svg;

  height = 200;
  width = 400;

  domain;
  color;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.domain =
      this.chart.category ||
      this.chart.data.map((d) => d.category).filter(unique);

    this.color = d3
      .scaleOrdinal()
      .domain(this.domain)
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
      .attr(
        'viewBox',
        `${-this.width / 2} ${-this.height / 2} ${this.width} ${this.height}`
      )
      .style('font-size', '8px');

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.volume);

    const arcs = pie(this.chart.data);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(this.width, this.height) / 2 - 1);

    const arcLabel = (() => {
      const radius = (Math.min(this.width, this.height) / 2) * 0.8;
      return d3.arc().innerRadius(radius).outerRadius(radius);
    })();

    this.svg
      .append('g')
      .attr('stroke', 'white')
      .selectAll('path')
      .data(arcs)
      .join('path')
      .attr('fill', (d) => this.color(d.data.category))
      .attr('d', arc)
      .append('title')
      .text((d) => `${d.data.category} (${d.data.volume})`);

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
