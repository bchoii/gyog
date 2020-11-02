import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { uuid } from '../../../../../../../../../../../main/src/utils';
import { AppService } from '../../../app.service';
import { ListComponent } from '../list.component';

const businessname = 'Bethesda Medical Centre';

const reminder = (
  patient
) => `Dear ${patient.name}, Beth here from ${businessname}. Your next appointment is due in 7 days. Please click here to make your next appointment.

https://bethesda.que.bz/appointment?ref=${patient.ref}

To unsubscribe click https://bethesda.que.bz/unsub?ref=${patient.ref}`;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientComponent extends ListComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef
  ) {
    super(route, router, service, cdr, 'patient');
  }

  async create(): Promise<void> {
    const code = uuid();
    const item = (await this.service.create(this.modelname, {
      code,
      name: code,
      ref: code,
    })) as any;
    this.router.navigate([`../../edit/${this.modelname}`, item.id], {
      relativeTo: this.route,
    });
  }

  async sendwelcome(itemid): Promise<void> {
    this.service.sendbethesda(itemid, 'welcome');
    alert('Welcome sent.');
  }

  async sendbethesda(itemid, action): Promise<void> {
    this.service.sendbethesda(itemid, action);
    alert('Reminder sent.');
  }

  // async createreminder(patient): Promise<void> {
  //   const code = uuid();
  //   const item = (await this.appService.create('reminder', {
  //     code,
  //     name: patient.name,
  //     contact: patient.contact,
  //     reminderdate: renderDate(addDays(new Date(), 75)),
  //     message: reminder(patient),
  //   })) as any;
  //   this.router.navigate([`../../edit/reminder`, item.id], {
  //     relativeTo: this.route,
  //   });
  // }
}
