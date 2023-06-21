import AppDataSource from "../data-source";
import EmailVerification from "../entities/EmailVerification";
import { IEmailVerificationsRepository } from "../interfaces/IEmailVerificationsRepository";

export default class EmailVerificationsRepository implements IEmailVerificationsRepository {
  private repository = AppDataSource.getRepository(EmailVerification)

  public async create(data: Partial<EmailVerification>): Promise<EmailVerification> {
    const emailVerification = this.repository.create(data)
    await this.repository.save(emailVerification)

    return emailVerification;
  }
  
  public async findOne(id: string): Promise<EmailVerification> {
    return await this.repository.findOneBy({
      id
    })
  }

  public async findAll(): Promise<EmailVerification[]> {
    return await this.repository.find()
  }
}
