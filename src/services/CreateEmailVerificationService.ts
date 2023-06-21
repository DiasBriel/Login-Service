import { addMinutes } from "date-fns";
import { inject, injectable } from "tsyringe";
import EmailVerification from "../entities/EmailVerification";
import { emailTokenGenerator } from "../helpers/emailTokenGenerator";
import { IEmailVerificationsRepository } from "../interfaces/IEmailVerificationsRepository";

@injectable()
export default class CreateEmailVerificationService {
  constructor(
    @inject("EmailVerificationsRepository")
    private repository: IEmailVerificationsRepository
  ) {}

  public async execute(data: Partial<EmailVerification>): Promise<EmailVerification> {
    const token = emailTokenGenerator();

    const verificationData = {
      ...data,
      token,
      expiresAt: addMinutes(new Date(), 1)
    }

    return await this.repository.create(data);
  }
}
