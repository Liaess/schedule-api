import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { SEND_MAIL_MOCK } from '@mail/mocks';
import { MailerService } from '@nestjs-modules/mailer';

const mockSendMail = jest.fn();

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: mockSendMail,
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send an email', async () => {
    await service.send(SEND_MAIL_MOCK);

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledWith({
      to: SEND_MAIL_MOCK.to,
      subject: SEND_MAIL_MOCK.subject,
      html: SEND_MAIL_MOCK.html,
    });
  });

  it('should send an email with text', async () => {
    const mockText = 'text';
    await service.send({
      ...SEND_MAIL_MOCK,
      text: mockText,
    });

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledWith({
      to: SEND_MAIL_MOCK.to,
      subject: SEND_MAIL_MOCK.subject,
      html: mockText,
    });
  });
});
