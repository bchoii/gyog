import { randomBytes } from 'crypto';
import { differenceInMinutes, startOfDay } from 'date-fns';
import { sign, verify } from 'jsonwebtoken';
import { secret } from './secret.json';

const between = (value, min, max) => value >= min && value < max;

const isWorkingHours = date =>
  between(differenceInMinutes(date, startOfDay(date)), 9 * 60 + 30, 17 * 60);

const main = async () => {
  const date = new Date();
  console.log(differenceInMinutes(date, startOfDay(date)));
  console.log(9 * 60);
  console.log(9 * 60 + 30);
  console.log(isWorkingHours(new Date()));
};

const main6 = async () => {
  console.log(
    'this is a long url index/index.ht'.replace(/\/index\.html$/g, ''),
  );
};

const sanitize = s => s?.replace(/\/+/g, '/');

const main5 = async () => {
  console.log(
    sanitize(
      'somest/ri//ng.x..///x...x....x wuth ##$#()#I specia#.   characters.',
    ),
  );
};

const main4 = async () => {
  console.log(randomBytes(32).toString('hex'));
  // console.log(randomBytes(32).toString('base64'));
  // console.log(randomBytes(32).toString('ascii'));
  // console.log(randomBytes(32).toString('utf-8'));
  console.log(Math.random().toString(36));
};

const main3 = async () => {
  const d1 = new Date().toISOString();
  const d2 = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60 * 1000,
  ).toISOString();
  console.log(d1);
  console.log(d2);
};

const main2 = async () => {
  console.log({ secret });
  const token = sign({ test: 'test' }, secret, { expiresIn: '5s' });
  console.log({ token });
  for (let index = 0; index < 65; index++) {
    try {
      const decoded = verify(token, secret);
      console.log({ decoded });
    } catch (error) {
      console.error(error);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
};

if (require.main === module) {
  main();
}

// import { plainToClass } from 'class-transformer';
// import { MikroORM } from '@mikro-orm/core';
// import 'reflect-metadata';
// import { uuid } from '../../../main/src/utils';
// import { User } from '../entity/User';
// import config from './mikro-orm.config';

// export {};

// const main = async () => {
//   const orm = await MikroORM.init(config);

//   // const result = await orm.em.getConnection().execute('select * from "user"');
//   // console.log({ result });

//   const userRepository = orm.em.getRepository(User);

//   // {
//   //   const users = await userRepository.find({});
//   //   console.log({ users });
//   //   for (const user of users) {
//   //     await userRepository.remove(user);
//   //   }
//   //   await userRepository.flush();
//   // }

//   for (let index = 0; index < 20; index++) {
//     userRepository.persist(plainToClass(User, { id: uuid(), name: uuid() }));
//   }
//   await userRepository.flush();

//   // {
//   //   const users = await userRepository.find({});
//   //   console.log({ users });
//   // }

//   // {
//   //   userRepository.persist(plainToClass(User, { id: 'testid', name: 'Name' }));
//   //   await userRepository.flush();
//   // }

//   // {
//   //   const user = await userRepository.findOne({ id: 'testid' });
//   //   wrap(user).assign(
//   //     { name: 'New Name', records: [{ test: 'asd' }] },
//   //     { mergeObjects: true },
//   //   );
//   //   await userRepository.flush();
//   // }

//   // {
//   //   const users = await userRepository.find({});
//   //   console.log({ users });
//   // }

//   // {
//   //   const users = await userRepository.find({
//   //     id: '192abfac-3fbc-42cc-93b3-76a28a0ec2b2',
//   //   });
//   //   console.log({ users });
//   // }

//   // {
//   //   userRepository.persist(new User('test3'));
//   //   await userRepository.flush();
//   // }

//   // {
//   //   const users = await userRepository.find({});
//   //   console.log({ users });
//   // }

//   await orm.close();

//   await new Promise(r => setTimeout(r, 3000));
// };
