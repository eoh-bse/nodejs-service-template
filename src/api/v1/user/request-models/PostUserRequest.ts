import { IsNotEmpty, MaxLength } from "class-validator";

export class PostUserRequest {
  @IsNotEmpty()
  @MaxLength(32)
  public firstName: string;

  @IsNotEmpty()
  @MaxLength(64)
  public lastName: string;
}
