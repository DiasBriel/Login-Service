import { Router } from "express"
import EmailVerificationsController from "../controllers/EmailVerificationsController"
import { checkEmailTokenValidator, createEmailVerifValidator } from "../validators/emailVerificationValidation"

const emailVerificationsRoutes = Router()
const emailVerificationsController = new EmailVerificationsController()

emailVerificationsRoutes.post('/', createEmailVerifValidator, emailVerificationsController.create);
emailVerificationsRoutes.get('/:token', checkEmailTokenValidator, emailVerificationsController.checkVerificationToken);

export default emailVerificationsRoutes