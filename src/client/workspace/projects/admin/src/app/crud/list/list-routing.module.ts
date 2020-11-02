import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { CategoryComponent } from './category/category.component';
import { ChildComponent } from './child/child.component';
import { ConfigComponent } from './config/config.component';
import { CsatComponent } from './csat/csat.component';
import { ParentComponent } from './parent/parent.component';
import { PatientComponent } from './patient/patient.component';
import { ProductComponent } from './product/product.component';
import { QueueComponent } from './queue/queue.component';
import { ReminderComponent } from './reminder/reminder.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'csat', component: CsatComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'reminder', component: ReminderComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'child', component: ChildComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'queue', component: QueueComponent },
  // { path: 'treatment', component: TreatmentComponent },
  // { path: 'medication', component: MedicationComponent },
  // { path: 'prescription', component: PrescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
