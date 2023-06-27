import { inject, injectable } from "tsyringe";
import User from "../entities/User";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { hash } from "bcrypt"

@injectable()
export default class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository
  ) {}

  public async execute(data: Partial<User>): Promise<User> {
    const hashedPassword = await hash(data.password, 10);
    
    Object.assign(data, { password: hashedPassword });

    return await this.repository.create(data);
  }
}
