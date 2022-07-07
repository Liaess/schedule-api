import { prisma } from "@/config";
import { cleanDB, generateValidToken, initServer } from "../../helpers";
import supertest from "supertest";
import httpStatus from "http-status";
import { createUser, generateValidEventBody, populateEvents } from "../../factories";
import dayjs from "dayjs";

let server: supertest.SuperTest<supertest.Test>;

beforeAll(async() => {
  server = await initServer();
});

beforeEach(async() => {
  await cleanDB();
});

afterAll(async() => {
  await prisma.$disconnect();
});

describe("POST /events/register", () => {
  it("it should return status 201, when sucessfully create an event", async() => {
    const token = await generateValidToken();
    const event = generateValidEventBody();
    const response = await server.post("/events/register").set("Authorization", `Bearer ${token}`).send(event);
    expect(response.status).toBe(httpStatus.CREATED);
  });

  it("it should return status 400, when trying to create an event without end date", async() => {
    const token = await generateValidToken();
    const event = generateValidEventBody();
    const body = {
      title: event.title,
      start: event.start,
    };
    const response = await server.post("/events/register").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("it should return status 400, when trying to create an event without start date", async() => {
    const token = await generateValidToken();
    const event = generateValidEventBody();
    const body = {
      title: event.title,
      end: event.end,
    };
    const response = await server.post("/events/register").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("it should return status 400, when trying to create an event without title", async() => {
    const token = await generateValidToken();
    const event = generateValidEventBody();
    const body = {
      start: event.start,
      end: event.end,
    };
    const response = await server.post("/events/register").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("it should return status 409, when trying to create an event with start date equals to end date", async() => {
    const token = await generateValidToken();
    const event = generateValidEventBody();
    const body = {
      title: event.title,
      start: event.start,
      end: event.start,
    };

    const response = await server.post("/events/register").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.CONFLICT);
    expect(JSON.parse(response.text)["error"]).toBe("Start and end date cannot be the same!");
  });

  it("it should return status 409, when trying to create an event and already have an event at this time", async() => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const eventsInDB = await populateEvents(1, user.id);
    const body = {
      title: eventsInDB[0].title,
      start: eventsInDB[0].start,
      end: eventsInDB[0].end,
    };

    const response = await server.post("/events/register").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.CONFLICT);
    expect(JSON.parse(response.text)["error"]).toBe("Event is already booked!");
  });

  it("it should return status 409, when trying to create an event with start date after end date", async() => {
    const token = await generateValidToken();
    const start = dayjs().add(4, "day").toDate();
    const end = dayjs().add(2, "day").toDate();
    const event = generateValidEventBody(start, end);

    const response = await server.post("/events/register").send(event).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.CONFLICT);
    expect(JSON.parse(response.text)["error"]).toBe("Event cannot be in the past!");
  });

  it("it should return status 409, when trying to create an event with start date before current date", async() => {
    const token = await generateValidToken();
    const start = dayjs().subtract(2, "day").toDate();
    const end = dayjs().add(2, "day").toDate();
    const event = generateValidEventBody(start, end);

    const response = await server.post("/events/register").send(event).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.CONFLICT);
    expect(JSON.parse(response.text)["error"]).toBe("Event must be in the future!");
  });
});

describe("GET /events", () => {
  it("it should return status 200, when sucessfully get all events", async() => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const eventsInDB = await populateEvents(5, user.id);

    const response = await server.get("/events").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.length).toBe(eventsInDB.length);
  });
});

describe("PUT /events/:id", () => {
  it("it should return status 200, when sucessfully edit an event", async() => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await populateEvents(1, user.id);
    const newEventData = {
      title: "New event title",
    };

    const response = await server.put("/events/1").send(newEventData).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.OK);
  });
});

describe("DELETE /events/:id", () => {
  it("it should return status 200, when sucessfully delete an event", async() => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await populateEvents(1, user.id);

    const response = await server.delete("/events/1").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.OK);
  });

  it("it should return status 404, when trying to delete an event that does not exist", async() => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server.delete("/events/10").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("it should return status 401, when trying to delete an event that does not belong to the user", async() => {
    const user = await createUser();
    const anotherUser = await createUser();
    const token = await generateValidToken(anotherUser);
    await populateEvents(2, user.id);

    const response = await server.delete("/events/2").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
