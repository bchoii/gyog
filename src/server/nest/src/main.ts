import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { default as compression } from 'compression';
import { default as cookie } from 'cookie';
import { default as cookieParser } from 'cookie-parser';
import { default as helmet } from 'helmet';
import { join } from 'path';
import 'reflect-metadata';
import { renderDatetime } from '../../../../../main/src/utils';
import { AppModule } from './app.module';
import { secret } from './secret.json';
import { AllExceptionsFilter } from './util/AllExceptionsFilter';
import { backtickrenderer } from './util/BacktickRenderer';
import { textParser } from './util/contentparser';
import { ForbiddenExceptionFilter } from './util/ForbiddenExceptionFilter';
import { HttpExceptionFilter } from './util/HttpExceptionFilter';
import { NotFoundExceptionFilter } from './util/NotFoundExceptionFilter';
import { slash } from './util/slash';
import { xsrf } from './util/XsrfGuard';

const cookieparser2 = (req, res, next) => {
  req.cookies = {
    ...cookie.parse(req.headers.cookie || ''),
    ...cookie.parse(req.handshake?.headers.cookie || ''),
  };
  next();
};

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new NotFoundExceptionFilter(),
  );

  app.engine('html', (path, options, callback) =>
    callback(null, backtickrenderer(path, options)),
  );

  app.setBaseViewsDir(join(__dirname, '../../static'));
  app.setViewEngine('html');

  // import { default as rateLimit } from 'express-rate-limit';
  // app.use(
  //   rateLimit({
  //     windowMs: 5 * 1000,
  //     max: 60,
  //   }),
  // );

  app.use(slash);
  app.use(helmet());
  app.use(cookieParser(secret));
  app.use(xsrf);
  app.use(textParser);
  app.use(compression());

  const options = new DocumentBuilder()
    .setTitle('App Documentation')
    .setDescription('The API.')
    .setVersion('1.0')
    .addTag('app')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.enableShutdownHooks();
  await app.listen(3001);

  console.log(`${renderDatetime(new Date())} Application Server is ready.`);
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
}

bootstrap();

// process.on('exit', code => console.log(`MAIN exit ${code}`));

// process.on('SIGINT', () => console.log('MAIN SIGINT'));

// const main = async () => {};

// if (require.main === module) {
//   main();
// }
