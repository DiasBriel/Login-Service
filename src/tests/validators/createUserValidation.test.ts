import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../errors/apiError";
import { createUserValidation } from "../../validators/userValidation";

describe("Create user validation", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        name: "User Test",
        email: "user.test@email.com",
        password: "Password123@",
        status: "pending verification"
      },
    } as Request;
    res = {} as Response;
    next = jest.fn() as NextFunction;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call next() if validation passes", () => {
    createUserValidation(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  it("should throw BadRequestError if name is missing", () => {
    delete req.body.name;

    expect(() => createUserValidation(req, res, next)).toThrow(BadRequestError);
  });

  it("should throw BadRequestError if name is not valid", () => {
    req.body.name = "User";

    expect(() => createUserValidation(req, res, next)).toThrow(BadRequestError);
  });

  it("should throw BadRequestError if email is missing", () => {
    delete req.body.email;

    expect(() => createUserValidation(req, res, next)).toThrow(BadRequestError);
  });

  it("should throw BadRequestError if email is not valid", () => {
    req.body.email = "john.doe@example";

    expect(() => createUserValidation(req, res, next)).toThrow(BadRequestError);
  });

  it("should throw BadRequestError if password is missing", () => {
    delete req.body.password;

    expect(() => createUserValidation(req, res, next)).toThrow(BadRequestError);
  });

  it("should throw BadRequestError if password is not valid", () => {
    req.body.password = "password";

    expect(() => createUserValidation(req, res, next)).toThrow(BadRequestError);
  });

  it("should throw BadRequestError if status is missing", () => {
    delete req.body.status;

    expect(() => createUserValidation(req, res, next)).toThrow(BadRequestError);
  });
});
