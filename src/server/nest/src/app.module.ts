import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleDestroy,
} from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { default as mikroormconfig } from '../src/mikro-orm.config';
import { AppService } from './app.service';
import { CronService } from './cron.service';
import { RouteModule } from './route/route.module';
import { LoggerMiddleware } from './util/LoggerMiddleware';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MikroOrmModule.forRoot(mikroormconfig as any),
    RouteModule,
    WebsocketModule,
    // MulterModule.register({
    //   dest: './files',
    // }),
  ],

  providers: [AppService, CronService],
})

// OnApplicationShutdown
export class AppModule implements NestModule, OnModuleDestroy {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  async onModuleDestroy(): Promise<void> {
    // await this.connection.close();
  }

  // onApplicationShutdown(signal: string) {
  //   // console.log('AppModule.onApplicationShutdown', signal); // e.g. "SIGINT"
  //   // process.exit(0);
  // }
}
