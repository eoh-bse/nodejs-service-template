import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post
} from "@nestjs/common";
import { GetUserRequest } from "../request-models/GetUserRequest";
import { IUserService } from "src/application/services/IUserService";
import { PostUserRequest } from "../request-models/PostUserRequest";
import type { UserResponseModel } from "../response-models/UserResponseModel";
import userMapper from "../mappers/user-mapper";
import { IName } from "src/constants/IName";

@Controller("api/user/v1")
export class UserController {
  private readonly userService_: IUserService;

  constructor(@Inject(IName.IUserService) userService: IUserService) {
    this.userService_ = userService;
  }

  @Post()
  async create(@Body() request: PostUserRequest): Promise<UserResponseModel> {
    const result = await this.userService_.createUser(userMapper.toCreateUserRequest(request));
    if (result.success) return userMapper.toApi(result.value);
    throw new BadRequestException(result.errors);
  }

  @Get(":id")
  async get(@Param() request: GetUserRequest): Promise<UserResponseModel> {
    const user = await this.userService_.findUser(userMapper.toFindUserRequest(request));
    if (!user) throw new NotFoundException();
    return userMapper.toApi(user);
  }
}
