import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../interfaces/IUsersRepository";

@injectable()
export default class ActiveUserService {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository
  ) {}

  public async execute(email: string): Promise<void> {
    await this.repository.activateUser(email);
  }
};
