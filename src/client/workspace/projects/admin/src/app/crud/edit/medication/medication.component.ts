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
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicationComponent extends EditComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef,
    public location: Location
  ) {
    super(route, router, service, cdr, location, 'medication');
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this.cdr.markForCheck();
  }
}
