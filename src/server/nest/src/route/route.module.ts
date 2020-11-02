import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { BethesdaModule } from './bethesda/bethesda.module';
import { QueueModule } from './queue/queue.module';
import { RepositoryModule } from './repository/repository.module';
import { SecretModule } from './secret/secret.module';
import { StripeModule } from './stripe/stripe.module';
import { ThirtyModule } from './thirty/thirty.module';
import { MessageModule } from './message/message.module';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [
    ApiModule,
    AuthModule,
    AdminModule,
    SecretModule,
    QueueModule,
    BethesdaModule,
    RepositoryModule,
    StripeModule,
    ThirtyModule,
    MessageModule,
    AgentModule,
  ],
  providers: [],
  controllers: [],
})
export class RouteModule {}
