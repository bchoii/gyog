import { Location } from '@angular/common';
import { ChangeDetectorRef, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trackByFn } from '../../../../../../../../../../main/src/utils';
import { AppService } from '../../app.service';

@Directive()
export abstract class EditComponent implements OnInit {
  item = {} as any;

  trackByFn = trackByFn;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef,
    public location: Location,
    public modelname: string
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params.id;
    this.item = await this.service.getById(this.modelname, id);
    this.cdr.markForCheck();
  }

  async save(item): Promise<void> {
    await this.service.save(this.modelname, item);
    alert('Item saved.');
    // this.router.navigate(['../../..', 'list', this.modelname], {
    //   relativeTo: this.route,
    // });
  }

  back(): void {
    this.location.back();
  }
}
