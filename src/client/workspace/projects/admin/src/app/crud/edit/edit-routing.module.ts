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
import { ReminderComponent } from './reminder/reminder.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'user/:id', component: UserComponent },
  { path: 'config/:id', component: ConfigComponent },
  { path: 'csat/:id', component: CsatComponent },
  { path: 'patient/:id', component: PatientComponent },
  { path: 'reminder/:id', component: ReminderComponent },
  { path: 'appointment/:id', component: AppointmentComponent },
  { path: 'parent/:id', component: ParentComponent },
  { path: 'child/:id', component: ChildComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'product/:id', component: ProductComponent },
  // { path: 'treatment/:id', component: TreatmentComponent },
  // { path: 'medication/:id', component: MedicationComponent },
  // { path: 'prescription/:id', component: PrescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRoutingModule {}
