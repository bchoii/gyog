import * as nodemailer from 'nodemailer';
import { uuid } from '../../../../../../main/src/utils';
import { config } from '../config';

export const sendEmail = async (target, subject, content) => {
  const transporter = nodemailer.createTransport(
    'smtps://kidotech%40gmail.com:iqkzgddqexjcgaoi@smtp.gmail.com',
  );

  const mailOptions = {
    from: '"Kido" <kidotech@gmail.com>', // sender address
    to: `${target}`, // list of receivers
    // bcc: `bernard@kidotech.com`,
    subject, // Subject line
    // text: content // plaintext body
    // html: "<b>Hello world 🐴</b>" // html body
    html: content, // html body
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: ', info.response);
  return info;
};

const main = async () => {
  await sendEmail(
    'bernard@kidotech.com, bernard.choi@kidotech.com',
    `Test Email from ${config.host} - ${uuid()}`,
    uuid(),
  );
};

if (require.main === module) {
  main();
}
