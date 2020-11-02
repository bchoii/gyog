import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudRoutingModule } from './crud-routing.module';
import { EditModule } from './edit/edit.module';
import { ListModule } from './list/list.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CrudRoutingModule, ListModule, EditModule],
})
export class CrudModule {}
