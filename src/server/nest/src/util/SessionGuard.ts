import { EntityManager } from '@mikro-orm/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { default as cookie } from 'cookie';
import { verify } from 'jsonwebtoken';
import { User } from '../../entities/User';
import { secret } from '../secret.json';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly em: EntityManager) {}

  validateRequest = async request => {
    // console.log('request.cookies', request.cookies);
    // console.log('request.headers?.cookie', request.headers?.cookie);
    // console.log(
    //   'request.handshake?.headers.cookie',
    //   request.handshake?.headers.cookie,
    // );
    try {
      const cookies =
        request.cookies || cookie.parse(request.handshake?.headers.cookie);
      // console.log('cookies', cookies);
      const decoded = verify(cookies?.session, secret);
      // console.log('decoded', decoded);
      const { session } = decoded;
      // console.log('session', session);
      const user = await this.em.findOne(User, { session });
      // console.log('user', user);
      if (user) {
        request.user = user;
        return true;
      }
    } catch (error) {
      // console.log(error);
    }
    console.log(`SessionGuard blocked.`, request.originalUrl, request.method);
    return false;
  };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.validateRequest(request);
  }
}
