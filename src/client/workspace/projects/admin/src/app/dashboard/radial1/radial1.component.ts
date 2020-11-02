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
  selector: 'app-radial1',
  templateUrl: './radial1.component.html',
  styleUrls: ['./radial1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Radial1Component implements OnInit, AfterViewInit {
  @Input()
  chart;

  @ViewChild('chartcontainer')
  chartcontainer: ElementRef;

  svg;

  height = 200;
  width = 400;

  series;
  color;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
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
      .attr(
        'viewBox',
        `${-this.width / 2} ${-this.height / 2} ${this.width} ${this.height}`
      )
      .style('font-size', '8px');

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

    const innerRadius = 50;
    const outerRadius = 100;

    const categories = this.chart.category;

    const x = d3
      .scaleBand()
      .domain(categories)
      .range([0, 2 * Math.PI])
      .align(0);

    const y = (() => {
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(stack, (d) => d3.max(d, (d) => d[1]))])
        .range([innerRadius * innerRadius, outerRadius * outerRadius]);
      return Object.assign((d) => Math.sqrt(y(d)), y);
    })();

    const arc = d3
      .arc()
      .innerRadius((d) => y(d[0]))
      .outerRadius((d) => y(d[1]))
      .startAngle((d) => x(d.data.key) - x.bandwidth() / 2)
      .endAngle((d) => x(d.data.key) + x.bandwidth() / 2)
      .padAngle(0.01)
      .padRadius(innerRadius);

    this.svg
      .append('g')
      .selectAll('g')
      .data(stack)
      .join('g')
      .attr('fill', (d) => this.color(d.key))
      .selectAll('path')
      .data((d) => d)
      .join('path')
      .attr('d', arc)
      .append('title')
      .text((d) => `${d.key} (${d[1] - d[0]})`);

    const xAxis = (g) =>
      g.attr('text-anchor', 'middle').call((g) =>
        g
          .selectAll('g')
          .data(categories)
          .join('g')
          .attr(
            'transform',
            (d) => `rotate(${(x(d) * 180) / Math.PI})translate(0,-40)`
          )
          .call((g) => g.append('text').text((d) => d))
          .call((g) =>
            g
              .append('line')
              .attr('y1', -6)
              .attr('y2', -9)
              .attr('stroke', '#000')
          )
      );
    // const xAxis = (g) =>
    // g.attr('text-anchor', 'middle').call((g) =>
    //   g
    //     .selectAll('g')
    //     .data(stack)
    //     .join('g')
    //     .selectAll('g')
    //     .data((d) => d)
    //     .join('g')
    //     .call((g) =>
    //       g
    //         .append('text')
    //         .attr(
    //           'transform',
    //           (d) =>
    //             `rotate(${(x(d.data.key) * 180) / Math.PI})translate(0,-40)`
    //         )
    //         .text((d) => d.data.key)
    //     )
    // );

    this.svg.append('g').call(xAxis);

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
