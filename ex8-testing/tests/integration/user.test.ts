import request from "supertest";
import app from "../../src/app";
import { resetUsers } from "../../src/data/user.store";

const AUTH_HEADER = { Authorization: "Bearer test-token" };

describe("User API", () => {
  beforeEach(() => {
    resetUsers();
  });

  it("rejects unauthenticated requests", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Unauthorized");
  });

  it("GET /users should return list", async () => {
    const res = await request(app).get("/users").set(AUTH_HEADER);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /users/:id should return a user", async () => {
    const res = await request(app).get("/users/1").set(AUTH_HEADER);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: "John" });
  });

  it("GET /users/:id returns 404 for missing user", async () => {
    const res = await request(app).get("/users/999").set(AUTH_HEADER);

    expect(res.status).toBe(404);
  });

  it("POST /users success", async () => {
    const res = await request(app)
      .post("/users")
      .set(AUTH_HEADER)
      .send({ name: "Alice" });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Alice");
    expect(res.body.id).toBe(2);
  });

  it("POST /users validation error", async () => {
    const res = await request(app)
      .post("/users")
      .set(AUTH_HEADER)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Name must be at least 2 characters");
  });

  it("PUT /users/:id success", async () => {
    const res = await request(app)
      .put("/users/1")
      .set(AUTH_HEADER)
      .send({ name: "Johnny" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: "Johnny" });
  });

  it("PUT /users/:id returns 404 for missing user", async () => {
    const res = await request(app)
      .put("/users/777")
      .set(AUTH_HEADER)
      .send({ name: "Ghost" });

    expect(res.status).toBe(404);
  });

  it("DELETE /users/:id success", async () => {
    const res = await request(app)
      .delete("/users/1")
      .set(AUTH_HEADER);

    expect(res.status).toBe(204);
  });

  it("DELETE /users/:id returns 404 for missing user", async () => {
    const res = await request(app)
      .delete("/users/999")
      .set(AUTH_HEADER);

    expect(res.status).toBe(404);
  });
});
