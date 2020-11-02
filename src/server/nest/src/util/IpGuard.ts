import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';

export const Ips = (...ips: string[]) => SetMetadata('ips', ips);

const matchIps = (ips, userip) => {
  if (ips.includes(userip)) {
    return true;
  }
  console.log(`IpGuard blocked ${userip} not in [${ips}].`);
  return false;
};

@Injectable()
export class IpGuard implements CanActivate {
  constructor(private ips: string[]) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('IpGuard');
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log({ request });
    const ip =
      request.headers['x-forwarded-for'] || request.headers['x-real-ip'];
    console.log({ ip });
    return matchIps(this.ips, ip);
  }
}
