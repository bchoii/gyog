import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Role, User } from '../../../entities2/User';

const getroles = email =>
  email.endsWith('@kidotech.com')
    ? [Role.Verified, Role.Administrator]
    : email.endsWith('@grabtaxi.com')
    ? [Role.Verified]
    : [];

@Injectable()
export class AuthService {
  constructor(private readonly em: EntityManager) {}

  async get(email) {
    console.log('getemail', email);
    const user = await this.em.findOne(User, { email });
    console.log({ user });
    if (user) {
      return user;
    }
    const user2 = this.em.create(User, {
      email,
      session: randomBytes(4).toString('hex'),
      roles: getroles(email),
    });
    console.log('user2', JSON.stringify(user2));
    await this.em.persistAndFlush(user2);
    console.log('user2', JSON.stringify(user2));
    return user2;
  }

  async login(user) {
    user.lastlogin = user.thislogin;
    user.thislogin = new Date();
    user.session = randomBytes(4).toString('hex');
    await this.em.persistAndFlush(user);
  }

  async logout(user) {
    // invalidate existing sessions
    if (user) {
      user.session = randomBytes(4).toString('hex');
      await this.em.persistAndFlush(user);
    }
  }
}
