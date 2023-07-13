import type { User } from "src/domain/models/User";

interface IUserRepository {
  createUser(user: User): Promise<void>;
  findUserById(id: string): Promise<User>;
}

export type { IUserRepository };
