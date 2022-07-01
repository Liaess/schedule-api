import app, { init } from "@/app";
import { prisma } from "@/config";
import { cleanDB, generateValidToken } from "../../helpers";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import { createUser, findUserByEmail, generateValidUserBody } from "../../factories";

beforeAll(async() => {
  await init();
});

beforeEach(async() => {
  await cleanDB();
});

afterAll(async() => {
  await prisma.$disconnect();
});

const server = supertest(app);

describe("POST /users/register", () => {
  it("should respond with status 201, when body is valid", async() => {
    const body = generateValidUserBody();
    const response = await server.post("/users/register").send(body);
    const user = await findUserByEmail(body.email);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(user?.email).toBe(body.email);
  });
  it("should respond with status 400, when missing email", async() => {
    const body = generateValidUserBody();
    delete body.email;
    const response = await server.post("/users/register").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400, when missing name", async() => {
    const body = generateValidUserBody();
    delete body.name;
    const response = await server.post("/users/register").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400, when missing password", async() => {
    const body = generateValidUserBody();
    delete body.password;
    const response = await server.post("/users/register").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400, when missing confirmPassword", async() => {
    const body = generateValidUserBody();
    delete body.confirmPassword;
    const response = await server.post("/users/register").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400, when password and confirmPassword don't match", async() => {
    const body = generateValidUserBody();
    body.confirmPassword = "123456";
    const response = await server.post("/users/register").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 409, when user already registered", async() => {
    const userInsideDB = await createUser();
    const body = {
      name: userInsideDB.name,
      email: userInsideDB.email,
      password: userInsideDB.password,
      confirmPassword: userInsideDB.password
    };
    const response = await server.post("/users/register").send(body);
    expect(response.status).toBe(httpStatus.CONFLICT);
    expect(JSON.parse(response.text)["error"]).toBe("User already exists!");
  });
});
describe("POST /users/login", () => {
  it("should respond with status 200, when body is valid", async() => {
    const password = faker.internet.password(6);
    const userInsideDB = await createUser(password);
    const body = {
      email: userInsideDB.email,
      password,
    };
    const response = await server.post("/users/login").send(body);
    expect(response.status).toBe(httpStatus.OK);
  });
  it("should respond with status 400, when missing email", async() => {
    const password = faker.internet.password(6);
    await createUser(password);
    const body = {
      password,
    };
    const response = await server.post("/users/login").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400, when missing password", async() => {
    const email = faker.internet.email();
    await createUser(email);
    const body = {
      email,
    };
    const response = await server.post("/users/login").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 401, when sending invalid password", async() => {
    const password = faker.internet.password(6);
    const userInsideDB = await createUser();
    const body = {
      email: userInsideDB.email,
      password,
    };
    const response = await server.post("/users/login").send(body);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401, when user not registered", async() => {
    const email = faker.internet.email();
    const password = faker.internet.password(6);
    const body = {
      email,
      password,
    };
    const response = await server.post("/users/login").send(body);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});

describe("POST /users/logout", () => {
  it("it should return status 200, when sucessfully logout user", async() => {
    const token = await generateValidToken();
    const response = await server.post("/users/logout").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.OK);
  });
});
