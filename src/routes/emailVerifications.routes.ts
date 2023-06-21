import { Router } from "express"
import EmailVerificationsController from "../controllers/EmailVerificationsController"

const emailVerificationsRoutes = Router()
const emailVerificationsController = new EmailVerificationsController()

emailVerificationsRoutes.post('/', emailVerificationsController.create)

export default emailVerificationsRoutes