import "reflect-metadata"
import { container } from "tsyringe";
import CheckUserEmailService from "../../services/CheckUserEmailService"
import { ConflictError } from "../../shared/errors/apiError";

describe("Check Email Service", () => {
  it('Should check if email already exists', async () => {
    const usersRepositoryMock = {
      findOneByEmail: jest.fn().mockReturnValue(Promise.resolve({})),
    };
  
    container.registerInstance('UsersRepository', usersRepositoryMock);
    const checkUserEmailService = container.resolve(CheckUserEmailService);
  
    try {
      await checkUserEmailService.execute('email@test.com');
    } catch (error) {
      expect(error.message).toBe('Este e-mail já está cadastrado!');
    }
  
    expect(usersRepositoryMock.findOneByEmail).toHaveBeenCalledWith('email@test.com');
  
    container.reset();
  });

  it("Should throw an ConflictError", async () => {
    const usersRepositoryMock = {
      findOneByEmail: jest.fn().mockReturnValue(Promise.resolve({ id: 1, email: 'email@test.com' })),
    } as any;
  
    const checkUserEmailService = new CheckUserEmailService(usersRepositoryMock);
  
    await expect(checkUserEmailService.execute('email@test.com')).rejects.toThrow(ConflictError);
    expect(usersRepositoryMock.findOneByEmail).toHaveBeenCalledWith('email@test.com');
  });
})