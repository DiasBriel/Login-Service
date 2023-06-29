import { inject, injectable } from "tsyringe";
import { EmailVerificationStatusEnum } from "../enums/EmailVerificationStatusEnum";
import { IEmailVerificationsRepository } from "../interfaces/IEmailVerificationsRepository";
import { GoneError, NotFoundError } from "../errors/apiError";
import { differenceInMinutes } from "date-fns";
import EmailVerification from "../entities/EmailVerification";

interface IResponse {
  validatedToken: boolean;
  userEmail: string;
}

@injectable()
export default class CheckEmailTokenService {
  constructor(
    @inject("EmailVerificationsRepository")
    private repository: IEmailVerificationsRepository
  ) {}

  public async execute(token: string): Promise<IResponse> {
    const verification = await this.repository.findByToken(token);
    const validatedToken = await this.checkTokenValidity(verification);

    return {
      validatedToken,
      userEmail: verification.email
    }
  }
  
  private async checkTokenValidity(verification: EmailVerification | undefined): Promise<boolean> {
    if (!verification) {
      throw new NotFoundError("Code not found. Try again...");
    }
  
    if (this.isTokenExpired(verification.expiresAt)) {
      await this.handleExpiredToken(verification.email);
    }
    
    if (verification.status === EmailVerificationStatusEnum.EXPIRED) {
      throw new GoneError("This is an expired code. Generate a new code.");
    }

    return true;
  }
  
  private isTokenExpired(expiresAt: Date): boolean {
    return differenceInMinutes(new Date(), expiresAt) > 2;
  }
  
  private async handleExpiredToken(email: string): Promise<void> {
    await this.repository.updateStatus(email);
    throw new GoneError("This is an expired code. Generate a new code.");
  }  
};
