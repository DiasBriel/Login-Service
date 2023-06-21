import EmailVerification from "../entities/EmailVerification"

export interface IEmailVerificationsRepository {
  create(data: Partial<EmailVerification>): Promise<EmailVerification>
  findOne(id: string): Promise<EmailVerification>
  findAll(): Promise<EmailVerification[]>
};