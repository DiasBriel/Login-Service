import "reflect-metadata"
import CreateUserService from "../../services/CreateUserService";

describe("Create User Service", () => {
  it("Should create an user", async () => {
    const createData = {
      name: "User Test",
      email: "email@test.com",
      password: "testing!1"
    }

    const createdUser = {
      id: 1,
      name: "User Test",
      email: "email@test.com",
    }

    const usersRepositoryMock = {
      create: jest.fn().mockReturnValue(Promise.resolve(createdUser)),
    } as any;
    
    const createUserService = new CreateUserService(usersRepositoryMock);

    expect(createUserService.execute(createData));
    expect(usersRepositoryMock.create).toBeCalledWith(createData);
  })
})