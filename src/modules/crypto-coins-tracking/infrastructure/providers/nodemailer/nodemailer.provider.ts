import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotificationProviderService } from 'src/modules/crypto-coins-tracking/domain/services/notification-provider.service';

@Injectable()
export class NodeMailerProvider implements NotificationProviderService {
  private transporter: nodemailer.Transporter;

  public constructor(private readonly configService: ConfigService) {
    const user = this.configService.get<string>('EMAIL');
    const pass = this.configService.get<string>('EMAIL_PASSWORD');

    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user, pass },
    });
  }

  async notify(data: {
    to: string;
    topic?: string;
    message: string;
  }): Promise<any> {
    try {
      const email = this.configService.get<string>('EMAIL');
      const mailOptions: nodemailer.SendMailOptions = {
        from: email,
        to: data.to,
        subject: data.topic,
        text: data.message,
      };
      console.log(mailOptions);
      await this.transporter.sendMail(mailOptions);

      return true;
    } catch (error) {
      return false;
    }
  }
}
