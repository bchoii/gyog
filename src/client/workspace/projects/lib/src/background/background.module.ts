import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackgroundDirective } from './background.directive';

@NgModule({
  declarations: [BackgroundDirective],
  imports: [CommonModule],
  exports: [BackgroundDirective],
})
export class BackgroundModule {}
