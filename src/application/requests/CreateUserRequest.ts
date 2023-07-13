type CreateUserRequestInit = {
  firstName: string;
  lastName: string;
};

export class CreateUserRequest {
  public firstName: string;
  public lastName: string;

  constructor({ firstName, lastName }: CreateUserRequestInit) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
