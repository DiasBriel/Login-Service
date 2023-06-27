import EmailVerification from "../entities/EmailVerification";

export interface IEmailVerificationsRepository {
  create(data: Partial<EmailVerification>): Promise<EmailVerification>;
  findOne(id: string): Promise<EmailVerification>;
  findAll(): Promise<EmailVerification[]>;
  findByEmail(email: string): Promise<EmailVerification>;
  findByToken(token: string): Promise<EmailVerification>;
  updateStatus(email: string): Promise<void>;
}
