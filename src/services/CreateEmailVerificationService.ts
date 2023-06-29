import { addMinutes } from "date-fns";
import { inject, injectable } from "tsyringe";
import transporter from "../config/nodemailer.config";
import EmailVerification from "../entities/EmailVerification";
import { EmailVerificationStatusEnum } from "../enums/EmailVerificationStatusEnum";
import { IEmailVerificationsRepository } from "../interfaces/IEmailVerificationsRepository";
import { emailTokenGenerator } from "../utils/emailTokenGenerator";

@injectable()
export default class CreateEmailVerificationService {
  constructor(
    @inject("EmailVerificationsRepository")
    private repository: IEmailVerificationsRepository
  ) {}

  public async execute(email: string): Promise<EmailVerification> {
    const token = emailTokenGenerator();

    const verificationData = {
      email,
      token,
      expiresAt: addMinutes(new Date(), 2),
      status: EmailVerificationStatusEnum.ACTIVE,
    };

    const createdVerification = await this.repository.create(verificationData);

    if(createdVerification) {
      await this.sendVerificationEmail(
        createdVerification.email, 
        createdVerification.token
      );
    }

    return createdVerification;
  }

  private async sendVerificationEmail(email: string, token: string): Promise<void> {
    const emailData = {
      from: process.env.NM_SENDER,
      to: email,
      subject: 'E-mail Teste',
      text: `Seu token: ${token}`
    }

    const info = await transporter.sendMail(emailData);

    console.log(info)
  }
}
