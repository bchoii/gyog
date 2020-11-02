import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { EditComponent } from '../edit.component';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrescriptionComponent extends EditComponent implements OnInit {
  patients = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef,
    public location: Location
  ) {
    super(route, router, service, cdr, location, 'prescription');
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.patients = await this.service.getBySearch3('patient', {});
    this.cdr.markForCheck();
  }
}
