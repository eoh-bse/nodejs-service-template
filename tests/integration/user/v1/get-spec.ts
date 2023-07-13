import * as request from "supertest";
import type { INestApplication } from "@nestjs/common";
import type { IUserRepository } from "src/domain/repositories/IUserRepository";
import { User } from "src/domain/models/User";
import { LocalServer } from "tests/helpers/LocalServer";
import { HttpStatusCodes } from "src/api/constants/HttpStatusCodes";

function makeRequest(app: INestApplication, userId: string): request.Test {
  return request(app.getHttpServer()).get(`/api/user/v1/${userId}`);
}

describe("GET /user/v1 should", () => {
  let app: INestApplication;

  const user = User.create({
    id: "1",
    firstName: "Elbert",
    lastName: "Oh"
  }).value;

  beforeEach(async () => {
    app = await LocalServer.start();
  });

  it("return 200 with created user given existing user id", async () => {
    const userRepo = await app.resolve<IUserRepository>("IUserRepository");
    await userRepo.createUser(user);
    const response = await makeRequest(app, user.id);

    expect(response.statusCode).toEqual(HttpStatusCodes.Ok);
    expect(response.body).toEqual({
      id: "1",
      firstName: "Elbert",
      lastName: "Oh"
    });
  });

  it("return 404 given non-existing user id", async () => {
    const response = await makeRequest(app, "10");

    expect(response.statusCode).toEqual(HttpStatusCodes.NotFound);
    expect(response.body).toEqual({
      message: "Not Found",
      statusCode: 404
    });
  });
});
