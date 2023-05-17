import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../services/CreateUserService";

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createUserService = container.resolve(CreateUserService)
      const user = await createUserService.execute(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "erro no servidor" });
    }
  }
}
