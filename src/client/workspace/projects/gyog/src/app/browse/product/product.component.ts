import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  modelname = 'product';
  item;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef,
    public location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params.id;
    this.item = await this.service.getById(this.modelname, id);
    this.cdr.markForCheck();
  }

  cart(item) {
    this.service.cart = [...this.service.cart, item];
    this.router.navigate(['/cart']);
  }
}
