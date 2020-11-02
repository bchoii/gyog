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

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent extends ListComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef
  ) {
    super(route, router, service, cdr, 'parent');
  }

  async create(): Promise<void> {
    const code = uuid();
    const item = (await this.service.create(this.modelname, {
      code,
      name: `Parent ${code}`,
    })) as any;
    this.router.navigate([`../../edit/${this.modelname}`, item.id], {
      relativeTo: this.route,
    });
  }
}
