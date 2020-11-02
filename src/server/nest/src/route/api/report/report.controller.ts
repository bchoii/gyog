import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../../util/RoleGuard';
import { SessionGuard } from '../../../util/SessionGuard';
import { ReportService } from './report.service';
import { genExceljs, totable } from './xlsx';

@Controller('api/report')
@UseGuards(SessionGuard, new RoleGuard(['Manager']))
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // @Get('*')
  // get(@Request() request) {
  //   throw new NotFoundException();
  // }

  @Post('')
  async report(@Response() response, @Body() body) {
    const json = await (async () => {
      switch (body.type) {
        case 'Appointment Report': {
          const sql = `select * from "appointment"
            where "appointment"."appointmentdate" >= ? and "appointment"."appointmentdate" <= ?
            order by "appointment"."appointmentdate", "appointment"."appointmenttime"`;
          const params = [body.startdate, body.enddate];

          const json = await this.reportService.query(sql, params);
          return json;
        }
        case 'Csat Report': {
          const sql = `select * from "csat"
            where "csat"."created" between ?::timestamp and ?::timestamp + '1 day'::interval
            order by "csat"."created"`;
          const params = [body.startdate, body.enddate];

          const json = await this.reportService.query(sql, params);
          return json;
        }
        default:
          break;
      }
    })();

    const reportbuffer = await genExceljs(totable(json));

    response.type('.xlsx');
    response.end(reportbuffer, 'binary');
  }
}
