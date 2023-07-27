import type { CreateUserRequest } from "src/application/requests/CreateUserRequest";
import type { FindUserRequest } from "src/application/requests/FindUserRequest";
import { IIdGenerator } from "src/application/services/IIdGenerator";
import { type IUserRepository } from "src/domain/repositories/IUserRepository";
import { type IUserService } from "src/application/services/IUserService";
import { Inject } from "@nestjs/common";
import type { Result } from "src/domain/value-objects/Result";
import { User } from "src/domain/models/User";
import { IName } from "src/constants/IName";

export class UserService implements IUserService {
  private readonly idGen_: IIdGenerator;
  private readonly userRepository_: IUserRepository;

  constructor(
    @Inject(IName.IIdGenerator) idGen: IIdGenerator,
    @Inject(IName.IUserRepository) userRepository: IUserRepository
  ) {
    this.idGen_ = idGen;
    this.userRepository_ = userRepository;
  }

  async createUser(request: CreateUserRequest): Promise<Result<User>> {
    const userCreationResult = User.create({
      id: this.idGen_.generate(),
      firstName: request.firstName,
      lastName: request.lastName
    });

    if (!userCreationResult.success) return userCreationResult;

    await this.userRepository_.createUser(userCreationResult.value);
    return userCreationResult;
  }

  async findUser(request: FindUserRequest): Promise<User> {
    const res = await this.userRepository_.findUserById(request.id);
    return res;
  }
}
