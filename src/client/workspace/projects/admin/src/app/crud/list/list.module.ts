import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginatorModule } from '../../../../../lib/src/paginator/paginator.module';
import { PipeModule } from '../../../../../lib/src/pipe/pipe.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { ConfigComponent } from './config/config.component';
import { CsatComponent } from './csat/csat.component';
import { ListRoutingModule } from './list-routing.module';
import { MedicationComponent } from './medication/medication.component';
import { PatientComponent } from './patient/patient.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ReminderComponent } from './reminder/reminder.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    UserComponent,
    CsatComponent,
    PatientComponent,
    TreatmentComponent,
    ReminderComponent,
    AppointmentComponent,
    ConfigComponent,
    MedicationComponent,
    PrescriptionComponent,
    CategoryComponent,
    ProductComponent,
    ParentComponent,
    ChildComponent,
    QueueComponent,
  ],
  imports: [CommonModule, ListRoutingModule, PipeModule, PaginatorModule],
})
export class ListModule {}
