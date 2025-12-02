import request from "supertest";
import { app } from "../../app.js";
import { sequelize, User, Restaurant} from "../../db/models/index.js"

/**
 * Test Data from testSetup.js
 * - UserA: userID = 1
 * - UserB: userID = 2
 * - Restaurant1: restID = 1
 * - Restaurant1 schedule:
 *      Sunday open 0–24
 *      Monday closed
 */

const restID = 1;
const userID = 1;
const tableID = 1; // TEMPORARY — TABLES ARE NOT IMPLEMENTED YET (TODO)

describe("Reservation API", () => {
  // -------------------------------------------------- POST /reservation/ticket

  it("Get available reservation tickets (Sunday — open all day)", async () => {
    const res = await request(app).post("/v1/reservation/ticket").send({
      restID: restID,
      tableID: tableID,
      date_stamp: "2026-12-06", // Sunday
    });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.tickets)).toBe(true);
    expect(res.body.tickets.length > 0).toBe(true);
  });

  it("Get empty ticket list when restaurant is closed", async () => {
    const res = await request(app).post("/v1/reservation/ticket").send({
      restID: restID,
      tableID: tableID,
      date_stamp: "2026-12-07", // Monday - closed
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.tickets).toStrictEqual([]);
  });

  it("Fail ticket generation with invalid restaurant", async () => {
    const res = await request(app).post("/v1/reservation/ticket").send({
      restID: 9999,
      tableID: tableID,
      date_stamp: "2026-12-06",
    });

    expect(res.statusCode).toBe(404);
  });

  it("Fail ticket generation with invalid date", async () => {
    const res = await request(app).post("/v1/reservation/ticket").send({
      restID: restID,
      tableID: tableID,
      date_stamp: "invalid-date",
    });

    expect(res.statusCode).toBe(400);
  });

  // -------------------------------------------------- POST /reservation/create

  it("Create reservation — valid", async () => {
    const res = await request(app).post("/v1/reservation/create").send({
      restID: restID,
      userID: userID,
      tableID: tableID,
      date_stamp: "2026-12-06T10:00:00",
      capacity: 2,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toContain("Reservation made successfully");
  });

  it("Fail reservation creation — overlapping reservation", async () => {
    // First reservation at 12:00
    await request(app).post("/v1/reservation/create").send({
      restID: restID,
      userID: userID,
      tableID: tableID,
      date_stamp: "2026-12-06T12:00:00",
      capacity: 2,
    });

    // Try to book overlapping slot (±2 hours)
    const res = await request(app).post("/v1/reservation/create").send({
      restID: restID,
      userID: userID,
      tableID: tableID,
      date_stamp: "2026-12-06T13:00:00", // 1 hr apart → invalid
      capacity: 2,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("already booked");
  });

  it("Fail reservation creation — user does not exist", async () => {
    const res = await request(app).post("/v1/reservation/create").send({
      restID: restID,
      userID: 9999,
      tableID: tableID,
      date_stamp: "2026-12-06T14:00:00",
      capacity: 2,
    });

    expect(res.statusCode).toBe(404);
  });

  it("Fail reservation creation — invalid date", async () => {
    const res = await request(app).post("/v1/reservation/create").send({
      restID: restID,
      userID: userID,
      tableID: tableID,
      date_stamp: "invalid-date",
      capacity: 2,
    });

    expect(res.statusCode).toBe(400);
  });

  // -------------------------------------------------- GET /reservation/user/:userID

  it("Get user reservations — valid", async () => {
    const res = await request(app).get(`/v1/reservation/user/${userID}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.reservations)).toBe(true);
  });

  it("Get user reservations — invalid user", async () => {
    const res = await request(app).get("/v1/reservation/user/9999");
    expect(res.statusCode).toBe(404);
  });

  // -------------------------------------------------- GET /reservation/restaurant/:restID

  it("Get restaurant reservations — valid", async () => {
    const res = await request(app).get(`/v1/reservation/restaurant/${restID}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.reservations)).toBe(true);
  });

  it("Get restaurant reservations — invalid restID", async () => {
    const res = await request(app).get("/v1/reservation/restaurant/9999");
    expect(res.statusCode).toBe(404);
  });

  // -------------------------------------------------- DELETE /reservation/delete/:reserveID

  it("Delete reservation — valid", async () => {
    // Create reservation
    const created = await request(app).post("/v1/reservation/create").send({
      restID: restID,
      userID: userID,
      tableID: tableID,
      date_stamp: "2026-05-06T18:00:00",
      capacity: 2,
    });

    const pre_res = await request(app).get(`/v1/reservation/user/${userID}`) 
    let data = pre_res.body.reservations
    data = data[0]

    const res = await request(app)
      .delete(`/v1/reservation/delete/${data.reserveID}`)
      .send({restID:data.restID, userID:data.userID})

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("successfully removed");
  });

  it("Delete reservation — invalid reservationID", async () => {
    const res = await request(app)
      .delete("/v1/reservation/delete/9999")
      .send({ restID: restID, userID: userID });

    expect(res.statusCode).toBe(400);
  });
});


describe("Reservation double booking test", () => {

  let user;
  let rest;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    user = await User.create({
      first_name: "Test",
      last_name: "User",
      email: "test@test.com",
      password: "123",
    });

    rest = await Restaurant.create({
      userID: user.userID,
      name: "Testaurant",
      phone: "204-555-1234",
      address: "123 Example Street",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should block a second reservation for same table & date", async () => {
    const tableID = 1;
    const date_stamp = "2030-05-20T18:00:00"; // same exact slot

    // 1st reservation → should succeed
    const res1 = await request(app)
      .post("/v1/reservation/create")
      .send({
        restID: rest.restID,
        userID: user.userID,
        tableID,
        date_stamp,
        capacity : 3
      });

    console.log(res1.body.error || res1.body.message)
    expect(res1.status).toBe(201);

    // 2nd reservation → SAME slot → should trigger unique constraint
    const res2 = await request(app)
      .post("/v1/reservation/create")
      .send({
        restID: rest.restID,
        userID: user.userID,
        tableID,
        date_stamp,
        capacity : 3
      });

    // EXPECT FAILURE
    console.log(res2.body.error || res2.body.message)
    expect(res2.status).toBe(400); // or whatever your handler returns
    expect(res2.body.error).toBe(
      "Reservation time already booked"
    );
  });

});
