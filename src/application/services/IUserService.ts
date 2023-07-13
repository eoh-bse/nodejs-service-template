import type { CreateUserRequest } from "../requests/CreateUserRequest";
import type { FindUserRequest } from "../requests/FindUserRequest";
import type { Result } from "src/domain/value-objects/Result";
import type { User } from "src/domain/models/User";

interface IUserService {
  createUser(request: CreateUserRequest): Promise<Result<User>>;
  findUser(request: FindUserRequest): Promise<User>;
}

export type { IUserService };
