import supertest from "supertest";
import app, { init } from "@/app";
import { prisma } from "@/config";
import httpStatus from "http-status";

beforeAll(async() => {
  await init();
});

afterAll(async() => {
  await prisma.$disconnect();
});

const server = supertest(app);

describe("GET /health", () => {
  it("should respond with status 200 with OK! text", async() => {
    const response = await server.get("/health");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe("OK");
  });
});
