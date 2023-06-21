import { Router } from "express";
import emailVerificationsRoutes from "./emailVerifications.routes";
import userRoutes from "./users.routes";

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/email-verifications', emailVerificationsRoutes)

export default routes