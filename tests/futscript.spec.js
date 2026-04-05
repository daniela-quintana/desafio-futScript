const request = require("supertest");
const app = require("../index");

describe("FutScript API", () => {
  let token = "";

  it("GET /equipos devuelve un Array y status 200", async () => {
    const { body, statusCode } = await request(app).get("/equipos");
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Array);
  });

  it("POST /equipos sin token devuelve status 401", async () => {
    const { statusCode } = await request(app)
      .post("/equipos")
      .send({ name: "Barcelona" });
    expect(statusCode).toBe(401);
  });

  it("POST /login con credenciales correctas devuelve un Object", async () => {
    const { body, statusCode } = await request(app)
      .post("/login")
      .send({ username: "admin", password: "1234" });
    token = body.token;
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
  });

  it("POST /login con credenciales incorrectas devuelve status 400", async () => {
    const { statusCode } = await request(app)
      .post("/login")
      .send({ username: "admin", password: "wrong" });
    expect(statusCode).toBe(400);
  });

  it("POST /equipos/:teamID/jugadores con token válido devuelve status 201", async () => {
    const { statusCode } = await request(app)
      .post("/equipos/1/jugadores")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Modric", position: 2 });
    expect(statusCode).toBe(201);
  });
});
