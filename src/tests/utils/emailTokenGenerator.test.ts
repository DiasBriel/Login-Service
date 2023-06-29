import { emailTokenGenerator } from "../../utils/emailTokenGenerator";

describe("Email Token Generator", () => {
  let token;

  beforeEach(() => token = emailTokenGenerator());

  it("Should generate a random token with length 6", () => {
    expect(token).toHaveLength(6);
  });

  it("Should only contain uppercase letters and digits", () => {
    const regex = /^[A-Z0-9]+$/;
    expect(token).toMatch(regex);
  });
});
