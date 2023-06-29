import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { UserStatusEnum } from "../enums/UserStatusEnum";
import { throwErrorValidation } from "./throwErrorValidation";

export const createUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .regex(/^(?!.*\d)[A-Za-z]+(?: [A-Za-z]+)+$/)
      .required()
      .messages({
        "string.pattern.base":
          "Field 'name' must be a valid name with at least one last name.",
        "any.required": "Field 'name' is required.",
      }),
    email: Joi.string().email().required().messages({
      "string.email": "Field 'email' must be a valid email address.",
      "any.required": "Field 'email' is required.",
    }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Field 'password' must be at least 6 characters long, including at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&).",
        "any.required": "Field 'password' is required.",
      }),
    status: Joi.string().valid(...Object.values(UserStatusEnum)).required().messages({
      "any.required": "Field 'status' is required.",
    }),
  });

  throwErrorValidation(req, schema);

  next();
}
