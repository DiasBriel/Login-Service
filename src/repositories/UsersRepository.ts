import AppDataSource from "../data-source";
import User from "../entities/User";
import { IUsersRepository } from "../interfaces/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private repository = AppDataSource.getRepository(User)

  public async create(data: Partial<User>): Promise<User> {
    const user = this.repository.create(data)
    await this.repository.save(user)

    return user
  }

  public async findOne(id: string): Promise<User> {
    return await this.repository.findOneBy({
      id
    })
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({
      email
    })
  }

  public async findAll(): Promise<User[]> {
    return await this.repository.find()
  }

  public async update(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
  public async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
