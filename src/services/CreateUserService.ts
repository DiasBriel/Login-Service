import { inject, injectable } from "tsyringe";
import User from "../entities/User";
import { IUsersRepository } from "../interfaces/IUsersRepository";

@injectable()
export default class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository
  ) {}

  public async execute(data: Partial<User>): Promise<User> {
    return await this.repository.create(data);
  }
}
