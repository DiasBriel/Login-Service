import AppDataSource from "../data-source";
import EmailVerification from "../entities/EmailVerification";
import { EmailVerificationStatusEnum } from "../enums/EmailVerificationStatusEnum";
import { IEmailVerificationsRepository } from "../interfaces/IEmailVerificationsRepository";

export default class EmailVerificationsRepository implements IEmailVerificationsRepository {
  private repository = AppDataSource.getRepository(EmailVerification);

  public async create(data: Partial<EmailVerification>): Promise<EmailVerification> {
    const emailVerification = this.repository.create(data);
    await this.repository.save(emailVerification);

    return emailVerification;
  }

  public async findOne(id: string): Promise<EmailVerification> {
    return await this.repository.findOneBy({
      id,
    });
  }

  public async findAll(): Promise<EmailVerification[]> {
    return await this.repository.find();
  }

  public async findByEmail(email: string): Promise<EmailVerification> {
    return await this.repository.findOneBy({
      email,
      status: EmailVerificationStatusEnum.ACTIVE,
    });
  }

  public async findByToken(token: string): Promise<EmailVerification> {
    return await this.repository.findOneBy({
      token
    });
  }

  public async updateStatus(email: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(EmailVerification)
      .set({ status: EmailVerificationStatusEnum.EXPIRED })
      .where("email_verifications.email = :email", { email })
      .andWhere("email_verifications.status = :status", {
        status: EmailVerificationStatusEnum.ACTIVE,
      })
      .execute();
  }
}
