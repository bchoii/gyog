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
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientComponent extends EditComponent implements OnInit {
  treatments;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef,
    public location: Location
  ) {
    super(route, router, service, cdr, location, 'patient');
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.treatments = await this.service.getBySearch3('treatment', {});

    this.cdr.markForCheck();
  }
}
