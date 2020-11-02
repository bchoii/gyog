import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

const trim = s => (s.length > 80 ? s.slice(0, 80) + '...' : s);

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    if (req.headers['user-agent'] == 'ELB-HealthChecker/2.0') {
      return next();
    }

    switch (req.method) {
      case 'GET':
        console.log(
          req.headers['x-forwarded-for'] || '',
          req.headers['x-real-ip'] || '',
          req.method,
          trim(req.originalUrl),
        );
        break;
      case 'POST':
        console.log(
          req.headers['x-forwarded-for'] || '',
          req.headers['x-real-ip'] || '',
          req.method,
          req.headers['content-type'],
          trim(req.originalUrl),
          req.body,
        );
        break;
      default:
        console.log(
          req.headers['x-forwarded-for'] || '',
          req.headers['x-real-ip'] || '',
          req.method,
          req.headers['content-type'],
          trim(req.originalUrl),
          req.body,
        );
        break;
    }

    return next();
  }
}
