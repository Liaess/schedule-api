import { SendMailDto } from '@/mail/dto';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send({ to, subject, html, text }: SendMailDto) {
    const format: ISendMailOptions = {
      to,
      subject,
      html: text ? text : html,
    };

    await this.mailerService.sendMail(format);
  }
}
