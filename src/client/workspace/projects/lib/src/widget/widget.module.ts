import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChecklistComponent } from './checklist/checklist.component';
import { TogglebuttonComponent } from './togglebutton/togglebutton.component';

@NgModule({
  declarations: [ChecklistComponent, TogglebuttonComponent],
  imports: [CommonModule],
  exports: [ChecklistComponent, TogglebuttonComponent],
})
export class WidgetModule {}
