import { Module } from '@nestjs/common';
import { CounterModule } from '../counter/counter.module';
import { AppointmentController } from './appointment/appointment.controller';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { CsatController } from './csat/csat.controller';
import { GyogController } from './gyog/gyog.controller';
import { QueueController } from './queue/queue.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [CounterModule],
  providers: [CrudService],
  controllers: [
    UserController,
    GyogController,
    CsatController,
    AppointmentController,
    QueueController,
    // PatientController,
    // TreatmentController,
    CrudController, // CrudController should be last
  ],
  exports: [CrudService],
})
export class CrudModule {}
