import * as request from "supertest";
import type { INestApplication } from "@nestjs/common";
import { LocalServer } from "tests/helpers/LocalServer";
import { HttpStatusCodes } from "src/api/constants/HttpStatusCodes";

const expectedErrors = {
  invalidNameError: "Invalid name was given"
};

function createUser(firstName: string, lastName: string) {
  return {
    firstName,
    lastName
  };
}

function makeRequest(app: INestApplication, user: object): request.Test {
  return request(app.getHttpServer()).post("/api/user/v1").send(user);
}

describe("POST /user/v1 should", () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await LocalServer.start();
  });

  it("return 200 given valid user", async () => {
    const user = createUser("Eli", "Onami");
    const response = await makeRequest(app, user);

    expect(response.statusCode).toEqual(HttpStatusCodes.Created);
    expect(response.body).toEqual(
      expect.objectContaining({
        firstName: user.firstName,
        lastName: user.lastName
      })
    );
  });

  it("Return 400 given invalid first name", async () => {
    const user = createUser("David", "O'Connor");
    const response = await makeRequest(app, user);

    expect(response.statusCode).toEqual(HttpStatusCodes.BadRequest);
    expect(response.body).toEqual({
      message: [expectedErrors.invalidNameError],
      error: "Bad Request",
      statusCode: 400
    });
  });
});
