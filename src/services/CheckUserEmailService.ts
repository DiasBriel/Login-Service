import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { ConflictError } from "../errors/apiError";

@injectable()
export default class CheckUserEmailService {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository
  ) {}

  public async execute(email: string): Promise<void> {
    const checkEmail = await this.repository.findOneByEmail(email);
    
    if (checkEmail) {
      throw new ConflictError("This email is already registered!");
    }
  }
}
