import "reflect-metadata";
import { addMinutes } from "date-fns";
import { EmailVerificationStatusEnum } from "../../enums/EmailVerificationStatusEnum";
import CreateEmailVerificationService from "../../services/CreateEmailVerificationService";

jest.mock("../../utils/emailTokenGenerator", () => ({
  emailTokenGenerator: jest.fn().mockReturnValue("8IYGP3"),
}));

jest.mock("date-fns", () => ({
  addMinutes: jest.fn().mockReturnValue(new Date("2023-06-24T14:00:00.000Z")),
}));

describe("Create Email Verification Service", () => {
  let expiresAt;

  beforeAll(() => {
    expiresAt = addMinutes(new Date(), 2);
  });

  it("Should create an email verification", async () => {
    const emailTest = "email@test.com";

    const verificationData = {
      email: emailTest,
      token: "8IYGP3",
      expiresAt: new Date("2023-06-24T14:00:00.000Z"),
      status: EmailVerificationStatusEnum.ACTIVE,
    };

    const createdVerification = {
      id: 1,
      email: "email@test.com",
      token: "8IYGP3",
      expiresAt,
      status: EmailVerificationStatusEnum.ACTIVE,
    };

    const emailVerificationRepoMock = {
      create: jest.fn().mockReturnValue(Promise.resolve(createdVerification)),
    } as any;

    const createEmailVerificationService = new CreateEmailVerificationService(
      emailVerificationRepoMock
    );

    expect(createEmailVerificationService.execute(emailTest));
    expect(emailVerificationRepoMock.create).toBeCalledWith(verificationData);
  });
});
