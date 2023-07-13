import { FindUserRequest } from "src/application/requests/FindUserRequest";
import type { IUserRepository } from "src/domain/repositories/IUserRepository";
import type { IUserService } from "src/application/services/IUserService";
import { IdGenerator } from "src/application-impl/services/IdGenerator";
import { Mock } from "tests/helpers/Mock";
import { User } from "src/domain/models/User";
import { UserService } from "src/application-impl/services/UserService";

describe("UserService.findUser should", () => {
  let userRepositoryMock: Mock<IUserRepository>;
  let userService: IUserService;

  const userId = "1";

  beforeEach(() => {
    userRepositoryMock = new Mock<IUserRepository>();
    userService = new UserService(new IdGenerator(), userRepositoryMock.instance);
  });

  it("return user if found", async () => {
    const userToReturn = User.create({ id: userId, firstName: "Eli", lastName: "O'Conner" }).value;
    userRepositoryMock.setup("findUserById").returns(userToReturn);

    const user = await userService.findUser(new FindUserRequest(userId));

    userRepositoryMock.verifyOnce("findUserById", userId);
    expect(user).toStrictEqual(userToReturn);
  });

  it("return null if user is not found", async () => {
    userRepositoryMock.setup("findUserById").returns(Promise.resolve(null));

    const user = await userService.findUser(new FindUserRequest(userId));

    userRepositoryMock.verifyOnce("findUserById", userId);
    expect(user).toBeNull();
  });
});
