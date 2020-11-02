import { Module } from '@nestjs/common';
import { SignupController } from './signup/signup.controller';
import { ThirtyController } from './thirty.controller';

@Module({
  controllers: [SignupController, ThirtyController],
})
export class ThirtyModule {}
