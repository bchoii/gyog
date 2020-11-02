import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { addDays } from 'date-fns';
import { renderDate, uuid } from '../../../../../../../../../main/src/utils';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent implements OnInit {
  form = {
    type: 'Appointment Report',
    startdate: renderDate(addDays(new Date(), -7)),
    enddate: renderDate(addDays(new Date(), 7)),
  };
  constructor(public reportService: ReportService) {}

  ngOnInit(): void {}

  async report(form): Promise<void> {
    const blob = await this.reportService.report(form);

    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = `${form.type}-${uuid()}.xlsx`;
    link.click();
    alert('Report downloaded.');
    // setTimeout(() => {
    //   window.URL.revokeObjectURL(url);
    // });
  }
}
