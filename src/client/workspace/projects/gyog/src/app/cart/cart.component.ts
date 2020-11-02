import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  self$;
  email;

  constructor(
    public router: Router,
    public service: AppService,
    public cdr: ChangeDetectorRef
  ) {
    this.self$ = service.self$;
  }

  ngOnInit(): void {
    this.self$.subscribe((self) => {
      console.log({ self });
      this.email = self.email;
      this.cdr.markForCheck();
    });
  }

  clear() {
    this.service.cart = [];
  }
}
