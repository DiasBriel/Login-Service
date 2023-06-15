import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestError } from "../errors/apiError";

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
          "O campo 'nome' deve ser um nome válido com pelo menos um sobrenome.",
        "any.required": "O campo 'nome' é obrigatório.",
      }),
    email: Joi.string().email().required().messages({
      "string.email": "O campo 'e-mail' deve ser um endereço de e-mail válido.",
      "any.required": "O campo e-mail' é obrigatório.",
    }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "O campo 'senha' deve ter pelo menos 6 caracteres, incluindo pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial (@$!%*?&).",
        "any.required": "O campo 'senha' é obrigatório.",
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    error.details.forEach((detail) => {
      throw new BadRequestError(detail.message)
    })
  }

  next();
}
