import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestError } from "../errors/apiError";
import { throwErrorValidation } from "./throwErrorValidation";

export const createEmailVerifValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Field 'email' must be a valid email.",
      "any.required": "Field 'email' is required.",
    }),
  });

  throwErrorValidation(req, schema);

  next();
};

export const checkEmailTokenValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenValidationSchema = Joi.string().alphanum().length(6);
  const { token } = req.params;

  const { error } = tokenValidationSchema.validate(token);

  if (error) {
    throw new BadRequestError("Token only needs to contain letters and numbers, and six characters.");
  }

  next();
};
