import AppDataSource from "../data-source";
import User from "../entities/User";
import { UserStatusEnum } from "../enums/UserStatusEnum";
import { IUsersRepository } from "../interfaces/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private repository = AppDataSource.getRepository(User);

  public async create(data: Partial<User>): Promise<User> {
    const user = this.repository.create(data);
    await this.repository.save(user);

    return user;
  }

  public async findOne(id: string): Promise<User> {
    return await this.repository.findOneBy({
      id,
    });
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({
      email,
    });
  }

  public async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  public async activateUser(email: string): Promise<void> {
    await this.repository
    .createQueryBuilder()
    .update(User)
    .set({ status: UserStatusEnum.ACTIVE })
    .where("users.email = :email", { email })
    .execute()
  }
}
