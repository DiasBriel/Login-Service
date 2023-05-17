import { container } from "tsyringe";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import UsersRepository from "../../repositories/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)
