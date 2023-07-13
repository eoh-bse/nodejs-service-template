import { UserRepository } from "src/domain-impl/repositories/UserRepository";
import { User } from "src/domain/models/User";

describe("UserRepository.createUser should", () => {
  const user = User.create({
    id: "1",
    firstName: "Elton",
    lastName: "Oscar"
  }).value;

  it("correctly store the given user", async () => {
    const userRepository = new UserRepository();
    await userRepository.createUser(user);

    expect(userRepository.database.size).toEqual(1);
    expect(userRepository.database.get(user.id)).toEqual(user);
  });
});
