import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellComponent implements OnInit {
  categories;

  item = {
    name: '',
    description: '',
    category: undefined,
    imageurl: '',
  };

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.categories = (await this.service.getAll('category')).data;
    this.cdr.markForCheck();
  }

  async create(item): Promise<void> {
    const product = await this.service.create('product', item);
    console.log({ product });
    this.router.navigate([`/browse/product`, product.id]);
  }
}
