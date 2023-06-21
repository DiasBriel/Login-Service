import { container } from "tsyringe";
import { IEmailVerificationsRepository } from "../../interfaces/IEmailVerificationsRepository";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import EmailVerificationsRepository from "../../repositories/EmailVerificationsRepository";
import UsersRepository from "../../repositories/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<IEmailVerificationsRepository>(
  "EmailVerificationsRepository",
  EmailVerificationsRepository
)
