import supertest from "supertest";
import { prisma } from "@/config";
import httpStatus from "http-status";
import { initServer } from "../../helpers";

let server: supertest.SuperTest<supertest.Test>;

beforeAll(async() => {
  server = await initServer();
});

afterAll(async() => {
  await prisma.$disconnect();
});

describe("GET /health", () => {
  it("should respond with status 200 with OK! text", async() => {
    const response = await server.get("/health");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe("OK");
  });
});
