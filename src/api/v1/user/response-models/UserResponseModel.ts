type UserResponseModelInit = {
  id: string;
  firstName: string;
  lastName: string;
};

export class UserResponseModel {
  public id: string;
  public firstName: string;
  public lastName: string;

  constructor({ id, firstName, lastName }: UserResponseModelInit) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
