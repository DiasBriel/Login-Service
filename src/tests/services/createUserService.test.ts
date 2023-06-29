import "reflect-metadata";
import CreateUserService from "../../services/CreateUserService";

describe("Create User Service", () => {
  it("Should create an user", async () => {
    const createData = {
      name: "User Test",
      email: "email@test.com",
      password: "testing!1",
    };

    const usersRepositoryMock = {
      create: jest.fn().mockReturnValue(Promise.resolve(createData)),
    } as any;

    const createUserService = new CreateUserService(usersRepositoryMock);
    const createdUser = await createUserService.execute(createData);

    expect(usersRepositoryMock.create).toHaveBeenCalledWith({
      ...createData,
      password: expect.any(String)
    });

    expect(createdUser).toEqual(createData);
  });
});
