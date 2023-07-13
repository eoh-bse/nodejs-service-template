import { User } from "src/domain/models/User";

describe("User should", () => {
  it("return success result given valid inputs", () => {
    const expectedUser = {
      id: "1",
      firstName: "Eli",
      lastName: "O'Conner",
      fullName: "Eli O'Conner"
    };

    const result = User.create(expectedUser);

    expect(result.success).toEqual(true);
    expect(result.value).toEqual(expectedUser);
  });
});
