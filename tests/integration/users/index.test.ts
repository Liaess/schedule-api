import app, { init } from "@/app";
import { prisma } from "@/config";
import { cleanDB } from "../../helpers";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import { createUser } from "../../factories";

afterAll(async() => {
  await cleanDB();
  await prisma.$disconnect();
});

beforeAll(async() => {
  await init();
  await cleanDB();
});

const server = supertest(app);

describe("POST /users", () => {
  function generateValidbody() {
    const password = faker.internet.password();
    const body: { name?: string; email?: string; password?: string; confirmPassword?: string } = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      confirmPassword: password,
    };
    return body;
  }

  it("should respond with status 201, when body is valid", async() => {
    const body = generateValidbody();

    const response = await server.post("/users/sign-up").send(body);
    expect(response.status).toBe(httpStatus.CREATED);
  });

  it("should respond with status 400, when missing email", async() => {
    const body = generateValidbody();
    delete body.email;
    const response = await server.post("/users/sign-up").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400, when missing name", async() => {
    const body = generateValidbody();
    delete body.name;
    const response = await server.post("/users/sign-up").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400, when missing password", async() => {
    const body = generateValidbody();
    delete body.password;
    const response = await server.post("/users/sign-up").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400, when missing confirmPassword", async() => {
    const body = generateValidbody();
    delete body.confirmPassword;
    const response = await server.post("/users/sign-up").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400, when password and confirmPassword don't match", async() => {
    const body = generateValidbody();
    body.confirmPassword = "123456";
    const response = await server.post("/users/sign-up").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 409, when user already registered", async() => {
    const userInsideDB = await createUser();
    const body = {
      ...userInsideDB,
      confirmPassword: userInsideDB.password,
    };

    const response = await server.post("/users/sign-up").send(body);
    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});
