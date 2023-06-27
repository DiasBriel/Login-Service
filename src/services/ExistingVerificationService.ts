import { inject, injectable } from "tsyringe";
import { IEmailVerificationsRepository } from "../interfaces/IEmailVerificationsRepository";

@injectable()
export default class ExistingVerificationService {
  constructor(
    @inject("EmailVerificationsRepository")
    private repository: IEmailVerificationsRepository
  ) {}

  public async execute(email: string): Promise<void> {
      await this.repository.updateStatus(email);
  }
}
