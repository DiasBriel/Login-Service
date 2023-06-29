import User from "../entities/User";

export interface IUsersRepository {
  create(data: Partial<User>): Promise<User>;
  findOne(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
  activateUser(email: string): Promise<void>;
}
