import { Request, Response } from "express";
import { container } from "tsyringe";
import CheckUserEmailService from "../services/CheckUserEmailService";
import CreateUserService from "../services/CreateUserService";

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const checkUserEmailService = container.resolve(CheckUserEmailService);
    await checkUserEmailService.execute(email);

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute(req.body);

    return res.status(201).json(user);
  }
}
