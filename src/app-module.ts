import { IdGenerator } from "./application-impl/services/IdGenerator";
import { Module } from "@nestjs/common";
import { UserController } from "./api/v1/user/controllers/UserController";
import { UserRepository } from "./domain-impl/repositories/UserRepository";
import { UserService } from "./application-impl/services/UserService";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    { provide: "IIdGenerator", useClass: IdGenerator },
    { provide: "IUserRepository", useClass: UserRepository },
    { provide: "IUserService", useClass: UserService }
  ]
})
export class AppModule {}
