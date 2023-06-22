import { addMinutes } from "date-fns";
import { inject, injectable } from "tsyringe";
import EmailVerification from "../entities/EmailVerification";
import { EmailVerificationStatus } from "../enums/EmailVerificationStatus";
import { emailTokenGenerator } from "../helpers/emailTokenGenerator";
import { IEmailVerificationsRepository } from "../interfaces/IEmailVerificationsRepository";

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
      status: EmailVerificationStatus.ACTIVE
    }
    
    return await this.repository.create(verificationData);
  }
}
