import { IsNotEmpty, MaxLength } from "class-validator";

export class GetUserRequest {
  @IsNotEmpty()
  @MaxLength(64)
  public id: string;
}
