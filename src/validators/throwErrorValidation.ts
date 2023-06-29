import { Request } from "express";
import Joi from "joi";
import { BadRequestError } from "../errors/apiError";

export const throwErrorValidation = (req: Request, schema: Joi.ObjectSchema<any>) => {
  const { error } = schema.validate(req.body);

  if (error) {
    error.details.forEach((detail) => {
      throw new BadRequestError(detail.message);
    });
  }
};
