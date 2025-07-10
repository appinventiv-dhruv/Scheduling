import { Module } from '@nestjs/common';
import { BankModule } from './bank-account/bank-account.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule'
import { EmailModule } from './email/email.module';
import { SchedulerModule } from './scheduling/scheduling.module';
import { ScheduleService } from './scheduling/scheduling.service';

@Module({
  imports: [
    BankModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tests'),
    SchedulerModule,
    ScheduleModule.forRoot(),
    EmailModule
  ],
})
export class AppModule {}
