import User from "../entities/User";

export interface IUsersRepository {
  create(data: Partial<User>): Promise<User>
  findOne(id: string): Promise<User>
  findAll(): Promise<User[]>
  update(id: string): Promise<User>
  delete(id: string): Promise<void>
};
