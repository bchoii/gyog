import { default as fetch } from 'node-fetch';
import { uuid } from '../../../../../../main/src/utils';

export const sendSms = async (target, subject, content) => {
  const result = await (
    await fetch('https://rest.nexmo.com/sms/json', {
      method: 'post',
      body: JSON.stringify({
        api_key: '9df53d28',
        api_secret: '026fb44eb3cffbb5',
        to: target,
        from: subject,
        text: content,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();
  console.log(result);
  return result;
};

const main = async () => {
  await sendSms('6596693329', `Test`, uuid());
};

if (require.main === module) {
  main();
}
