import { type IUserRepository } from "src/domain/repositories/IUserRepository";
import type { User } from "src/domain/models/User";

export class UserRepository implements IUserRepository {
  public readonly database: Map<string, User>;

  constructor() {
    this.database = new Map();
  }

  createUser(user: User): Promise<void> {
    this.database.set(user.id, user);
    return Promise.resolve();
  }

  findUserById(id: string): Promise<User> {
    const user = this.database.has(id) ? this.database.get(id) : null;
    return Promise.resolve(user);
  }
}
