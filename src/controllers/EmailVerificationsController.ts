import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateEmailVerificationService from "../services/CreateEmailVerificationService";

export default class EmailVerificationsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createEmailVerificationService = container.resolve(CreateEmailVerificationService);
    const emailVerification = await createEmailVerificationService.execute(req.body);

    return res.status(200).json(emailVerification);
  }
}
