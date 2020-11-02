import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { ProductComponent } from './browse/product/product.component';
import { CartComponent } from './cart/cart.component';
import { LoginGuard } from './login.guard';
import { ProfileComponent } from './profile/profile.component';
import { SellComponent } from './sell/sell.component';

const routes: Routes = [
  { path: 'browse', component: BrowseComponent },
  { path: 'browse/product/:id', component: ProductComponent },
  { path: 'sell', component: SellComponent, canActivate: [LoginGuard] },
  { path: 'cart', component: CartComponent, canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: 'browse', pathMatch: 'full' },
  { path: '**', redirectTo: 'browse' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
