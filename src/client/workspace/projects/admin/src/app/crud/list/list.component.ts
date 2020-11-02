import { ChangeDetectorRef, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trackByFn } from '../../../../../../../../../../main/src/utils';
import { AppService } from '../../app.service';

@Directive()
export abstract class ListComponent implements OnInit {
  json;

  _currentpage = 0;

  get currentpage(): number {
    return this._currentpage;
  }

  set currentpage(currentpage) {
    this._currentpage = Math.max(Math.min(currentpage, this.pageCount), 0);
  }

  get list(): any[] {
    return this.json?.data || [];
  }

  get pageCount(): number {
    return this.json?.pageCount || 0;
  }

  trackByFn = trackByFn;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef,
    public modelname: string
  ) {}

  async nextpage(x): Promise<void> {
    this.currentpage = this.currentpage + x;
    this.json = await this.service.getAll(this.modelname, this.currentpage);
    this.cdr.markForCheck();
  }

  async gotopage(page): Promise<void> {
    this.currentpage = page;
    this.json = await this.service.getAll(this.modelname, this.currentpage);
    this.cdr.markForCheck();
  }

  async ngOnInit(): Promise<void> {
    this.nextpage(0);
  }

  async remove(id): Promise<void> {
    if (confirm('Record will be destroyed. Are you sure ?')) {
      try {
        await this.service.remove(this.modelname, id);
      } catch (error) {
        alert(error.message);
      }
      await this.ngOnInit();
    }
  }
}
