import { createConnection } from 'typeorm';
import { Appointment } from '../../entities/Appointment';
import { Patient } from '../../entities/Patient';

const main = async () => {
  const connection = await createConnection();
  const { manager: em } = connection;

  {
    const appointments = await em.find(Appointment, { name: '' });
    for (const appointment of appointments) {
      const patient = await em.findOne(Patient, { ref: appointment.ref });
      appointment.name = patient?.name || 'Anonymous';
      await em.save(appointment);
    }
  }

  {
    const appointments = await em.find(Appointment, { contact: '' });
    for (const appointment of appointments) {
      const patient = await em.findOne(Patient, { ref: appointment.ref });
      appointment.contact = patient?.contact || '';
      await em.save(appointment);
    }
  }

  await connection.close();
};

if (require.main === module) {
  main();
}
