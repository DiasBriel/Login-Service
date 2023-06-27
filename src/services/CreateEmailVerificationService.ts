import { addMinutes } from "date-fns";
import { inject, injectable } from "tsyringe";
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

    return await this.repository.create(verificationData);
  }
}
