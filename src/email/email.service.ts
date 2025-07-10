import { Injectable } from "@nestjs/common";
import {ConfigService} from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('user'),
        pass: this.configService.get('pass'),
      },
    });
  }

  async sendEmail(email: string, balance: number): Promise<void> {
    try {
      const info= await this.transporter.sendMail({
        from: this.configService.get('user'),
        to: email,
        subject: 'Your balance',
        text: `Your balance is ${balance}`,
      });
      console.log(`Email sent to ${email}: ${info.messageId}`);
    } 
    catch (error) {
      console.error(`Error sending email to ${email}:`, error);
    }
  }
}
