import { Result } from "../value-objects/Result";

type UserInit = {
  id: string;
  firstName: string;
  lastName: string;
};

export class User {
  private static readonly missingIdError: string = "User id is missing";
  private static readonly invalidNameError: string = "Invalid name was given";

  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly fullName: string;

  private constructor({ id, firstName, lastName }: UserInit) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
  }

  static create(user: UserInit): Result<User> {
    const errors: string[] = [];
    if (!user.id) errors.push(User.missingIdError);
    if (!user.firstName.startsWith("E") || !user.lastName.startsWith("O")) errors.push(User.invalidNameError);
    if (errors.length > 0) return Result.error(errors);

    return Result.ok(new User(user));
  }
}
