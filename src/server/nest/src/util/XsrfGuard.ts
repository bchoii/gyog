import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Observable } from 'rxjs';

export const xsrf = (req, res, next) => {
  const token = randomBytes(4).toString('hex');
  // console.log(`setting XSRF-TOKEN cookie to ${token}`);
  res.cookie('XSRF-TOKEN', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 5 * 60 * 1000, // 5 minutes
  });
  next();
};

const validateRequest = request => {
  if (request.cookies['XSRF-TOKEN'] === request.headers['x-xsrf-token']) {
    return true;
  }
  console.log(`XsrfGuard blocked.`);
  return false;
};

@Injectable()
export class XsrfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return validateRequest(context.switchToHttp().getRequest());
  }
}
