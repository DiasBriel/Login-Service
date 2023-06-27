import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { createUserValidation } from "../validators/userValidation";

const userRoutes = Router()
const usersController = new UsersController()

userRoutes.post('/', createUserValidation, usersController.create)

export default userRoutes