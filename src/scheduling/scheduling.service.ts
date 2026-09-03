import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Model } from "mongoose";
import { Bank } from "src/bank-account/bank-account.schema";
import { EmailService } from "src/email/email.service";

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Bank.name) private accountModel: Model<Bank>, private emailService: EmailService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  private async sendDailyBalance() {
    console.log('Scheduled job started...');
    const users = await this.accountModel.find({});
    try {
      await Promise.all(
        users.map((user) => {
          console.log(`Sending email to ${user.email}`);
          return this.emailService.sendEmail(user.email, user.balance);
        }),
      );
    } 
    catch (err) {
      console.error('Failed to send some emails:', err);
    }
  }
}


