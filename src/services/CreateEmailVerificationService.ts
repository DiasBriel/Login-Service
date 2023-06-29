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

    if (createdVerification) {
      await this.sendVerificationEmail(
        createdVerification.email,
        createdVerification.token
      );
    }

    return createdVerification;
  }

  private async sendVerificationEmail(
    email: string,
    token: string
  ): Promise<void> {
    const emailData = {
      from: `Tester <${process.env.NM_SENDER}>`,
      to: email,
      subject: "E-mail Verification",
      text: `Your token: ${token}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
      </head>
      <body>
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>Your Verification Token</h1>
          <p>Hello,</p>
          <p>There is your e-mail verification token:</p>
          <h2>${token}</h2>
          <p>The token is valid for 2 minutes.</p>
          <p>Please, use this token to complete the e-mail verification.</p>
          <p>Thank you!</p>
        </div>
      </body>
      </html>`,
    };

    await transporter.sendMail(emailData);
  }
}
