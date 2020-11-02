import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { renderDate } from '../../../../../../../main/src/utils';
import { Patient } from '../../../entities/Patient';
import { Prescription } from '../../../entities/Prescription';
import { sendSms } from '../../util/sms';
import { genappointment1 } from './bethesda';
import {
  appointmentremindertemplate,
  medicationremindertemplate,
  paymentlinktemplate,
  welcometemplate,
} from './template';

@Injectable()
export class BethesdaService {
  constructor(private readonly em: EntityManager) {}

  async appointment() {
    const bookings = await this.em.getConnection().execute(
      `select "appointmentdate" as "date", "appointmenttime" as "time", count(*)::integer as count
      from "appointment"
      where "appointmentdate" >= ?
      group by "appointmentdate", "appointmenttime"
      having count(*) > 1
      order by "appointmentdate", "appointmenttime"`,
      [renderDate(new Date())],
    );
    console.log({ bookings });

    return genappointment1(bookings);
  }

  async sms(id, action) {
    switch (action) {
      case 'welcome': {
        const patient = await this.em.findOne(Patient, id);
        const result = await sendSms(
          patient.contact,
          'Bethesda',
          welcometemplate(patient),
        );
        return result;
      }
      case 'appointmentreminder': {
        const patient = await this.em.findOne(Patient, id);
        const result = await sendSms(
          patient.contact,
          'Bethesda',
          appointmentremindertemplate(patient),
        );
        return result;
      }
      case 'medicationreminder': {
        const patient = await this.em.findOne(Patient, id);
        const result = await sendSms(
          patient.contact,
          'Bethesda',
          medicationremindertemplate(patient),
        );
        return result;
      }
      case 'paymentlink': {
        const prescription = await this.em.findOne(Prescription, id, [
          'patient',
        ]);
        console.log('prescription', prescription);
        const patient = prescription.patient;
        console.log('patient', patient);
        const result = await sendSms(
          patient.contact,
          'Bethesda',
          paymentlinktemplate(prescription),
        );
        return result;
      }
      default:
        break;
    }
  }
}
