import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { ListComponent } from '../list.component';

@Component({
  selector: 'app-csat',
  templateUrl: './csat.component.html',
  styleUrls: ['./csat.component.css'],
})
export class CsatComponent extends ListComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef
  ) {
    super(route, router, service, cdr, 'csat');
  }
}
