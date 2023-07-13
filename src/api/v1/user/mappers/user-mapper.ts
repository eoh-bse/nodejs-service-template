import { CreateUserRequest } from "src/application/requests/CreateUserRequest";
import { FindUserRequest } from "src/application/requests/FindUserRequest";
import type { GetUserRequest } from "../request-models/GetUserRequest";
import type { PostUserRequest } from "../request-models/PostUserRequest";
import type { User } from "src/domain/models/User";
import { UserResponseModel } from "../response-models/UserResponseModel";

function toCreateUserRequest(apiRequest: PostUserRequest): CreateUserRequest {
  return new CreateUserRequest({
    firstName: apiRequest.firstName,
    lastName: apiRequest.lastName
  });
}

function toFindUserRequest(apiRequest: GetUserRequest): FindUserRequest {
  return new FindUserRequest(apiRequest.id);
}

function toApi(user: User): UserResponseModel {
  return new UserResponseModel({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName
  });
}

export default {
  toCreateUserRequest,
  toFindUserRequest,
  toApi
};
