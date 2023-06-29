import { Request, Response } from "express";
import { container } from "tsyringe";
import CheckExistingVerification from "../services/ExistingVerificationService";
import CreateEmailVerificationService from "../services/CreateEmailVerificationService";
import CheckEmailTokenService from "../services/CheckEmailTokenService";
import ActiveUserService from "../services/ActiveUserService";

export default class EmailVerificationsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    
    const existingVerificationService = container.resolve(CheckExistingVerification);
    await existingVerificationService.execute(email);
    
    const createEmailVerificationService = container.resolve(CreateEmailVerificationService);
    const emailVerification = await createEmailVerificationService.execute(email);

    return res.status(200).json(emailVerification);
  }

  public async checkVerificationToken(req: Request, res: Response): Promise<Response> {
    const checkEmailTokenService = container.resolve(CheckEmailTokenService);
    const { validatedToken, userEmail } = await checkEmailTokenService.execute(req.params.token);
    
    const activeUserService = container.resolve(ActiveUserService);
    validatedToken && await activeUserService.execute(userEmail);

    return res.status(200).json({ success: true, message: "validated code!" });
  }
}
