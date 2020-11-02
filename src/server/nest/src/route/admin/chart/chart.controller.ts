import { EntityManager } from '@mikro-orm/core';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { range } from '../../../../../../../../main/src/utils';
import { RoleGuard } from '../../../util/RoleGuard';
import { SessionGuard } from '../../../util/SessionGuard';

@Controller('admin/charts')
@UseGuards(SessionGuard, new RoleGuard(['Manager']))
export class ChartController {
  constructor(private readonly em: EntityManager) {}

  @Get('')
  async charts() {
    return [
      {
        title: 'Rating',
        type: 'pie1',
        data: await this.em.getConnection().execute(
          `select "rating" as "category", count(*)::integer as "volume"
          from "csat" group by "category" order by "volume" desc`,
        ),
        category: ['excellent', 'good', 'average', 'bad', 'terrible'],
      },
      {
        title: 'Agent',
        type: 'stack1',
        data: await this.em.getConnection().execute(
          `select "agent" as "category", "rating" as "series", count(*)::integer as "volume"
          from "csat" where "agent" <> '' group by "category", "series" order by "volume" desc`,
        ),
        series: ['excellent', 'good', 'average', 'bad', 'terrible'],
      },
      {
        title: 'Date',
        type: 'line1',
        data: await this.em.getConnection().execute(
          `select to_char("created", 'YYYY-MM-DD') as "category", "rating" as "series", count(*)::integer as "volume"
          from "csat"
          where "created" > current_date - interval '20 days'
          group by "category", "series"
          order by "category"`,
        ),
        series: ['excellent', 'good', 'average', 'bad', 'terrible'],
      },
      {
        title: 'Date',
        type: 'stack1',
        data: await this.em.getConnection().execute(
          `select to_char("created", 'YYYY-MM-DD') as "category", "rating" as "series", count(*)::integer as "volume"
          from "csat"
          where "created" > current_date - interval '20 days'
          group by "category", "series" order by "category"`,
        ),
        series: ['excellent', 'good', 'average', 'bad', 'terrible'],
      },
      {
        title: 'Agent',
        type: 'group1',
        data: await this.em.getConnection().execute(
          `select "agent" as "category", "rating" as "series", count(*)::integer as "volume"
          from "csat" where "agent" <> '' group by "category", "series" order by "category"`,
        ),
        series: ['excellent', 'good', 'average', 'bad', 'terrible'],
      },
      {
        title: 'Details',
        type: 'bar1',
        data: await this.em.getConnection().execute(
          `select "details" as "category", count(*)::integer as "volume"
          from "csat" where "details" <> '' group by "category" order by "volume" desc`,
        ),
      },
      {
        title: 'Date',
        type: 'heat1',
        data: await this.em.getConnection().execute(
          `select to_char("created", 'HH24') as "category", to_char("created", 'YYYY-MM-DD') as "series", count(*)::integer as "volume"
          from "csat"
          where "created" > current_date - interval '20 days'
          group by "category", "series" order by "series"`,
        ),
        category: range(24).map(x => x.toString().padStart(2, '0')),
      },
      {
        title: 'Week',
        type: 'heat1',
        data: await this.em.getConnection().execute(
          `select to_char("created", 'HH24') as "category", trim(to_char("created", 'day')) as "series", count(*)::integer as "volume"
          from "csat" group by "category", "series" order by "series"`,
        ),
        category: range(24).map(x => x.toString().padStart(2, '0')),
        series: [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ],
      },
      {
        title: 'Week',
        type: 'bar1',
        data: await this.em.getConnection().execute(
          `select trim(to_char("created", 'day')) as "category", count(*)::integer as "volume"
          from "csat" group by "category"`,
        ),
        category: [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ],
      },
      {
        title: 'Week',
        type: 'stack1',
        data: await this.em.getConnection().execute(
          `select trim(to_char("created", 'day')) as "category", "rating" as "series", count(*)::integer as "volume"
          from "csat" group by "category", "series"`,
        ),
        category: [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ],
        series: ['excellent', 'good', 'average', 'bad', 'terrible'],
      },
      {
        title: 'Week',
        type: 'radial1',
        data: await this.em.getConnection().execute(
          `select trim(to_char("created", 'day')) as "category", "rating" as "series", count(*)::integer as "volume"
          from "csat" group by "category", "series"`,
        ),
        category: [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ],
        series: ['excellent', 'good', 'average', 'bad', 'terrible'],
      },
      {
        title: 'Hour of Day',
        type: 'radial1',
        data: await this.em.getConnection().execute(
          `select to_char("created", 'HH24') as "category", "rating" as "series", count(*)::integer as "volume"
          from "csat" group by "category", "series"`,
        ),
        category: range(24).map(x => x.toString().padStart(2, '0')),
        series: ['excellent', 'good', 'average', 'bad', 'terrible'],
      },
    ];
  }
}
