import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../../../../../lib/src/pipe/pipe.module';
import { UploaderModule } from '../../../../../lib/src/uploader/uploader.module';
import { WidgetModule } from '../../../../../lib/src/widget/widget.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { CategoryComponent } from './category/category.component';
import { ChildComponent } from './child/child.component';
import { ConfigComponent } from './config/config.component';
import { CsatComponent } from './csat/csat.component';
import { EditRoutingModule } from './edit-routing.module';
import { MedicationComponent } from './medication/medication.component';
import { ParentComponent } from './parent/parent.component';
import { PatientComponent } from './patient/patient.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ProductComponent } from './product/product.component';
import { ReminderComponent } from './reminder/reminder.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    UserComponent,
    ConfigComponent,
    CsatComponent,
    PatientComponent,
    TreatmentComponent,
    ReminderComponent,
    AppointmentComponent,
    MedicationComponent,
    PrescriptionComponent,
    CategoryComponent,
    ProductComponent,
    ParentComponent,
    ChildComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    EditRoutingModule,
    PipeModule,
    WidgetModule,
    UploaderModule,
  ],
})
export class EditModule {}
