import request from "supertest";
import { app } from "../../app.js";
import {
  sequelize,
  User,
  Restaurant,
  FP_Tables,
  Schedule,
} from "../../db/models/index.js";

/**
 * Helper function:
 * Creates a restaurant with schedule + tables
 * Returns: { user, rest, tables, ids }
 */
async function setupRestaurantWithTables(table_data) {
  const user = await User.create({
    first_name: "Test",
    last_name: "User",
    email: "test@test.com",
    password: "123",
  });

  const rest = await Restaurant.create({
    userID: user.userID,
    name: "Testaurant",
    phone: "204-555-1234",
    address: "123 Example Street",
  });

  // Schedule setup
  await Schedule.set_day(rest.restID, 0, 0, 24); // Sunday open
  await Schedule.set_day(rest.restID, 1, 0, 0); // Monday closed
  await Schedule.set_day(rest.restID, 2, 5, 20);

  // Table setup
  await FP_Tables.set_tables(rest.restID, table_data);
  const tables = await FP_Tables.get_tables(rest.restID);

  return { user, rest, tables };
}

// Global table test data
const table_data = [
  {
    type: "table",
    pos: { x: 150.03125, y: 249.8125 },
    rotation: 0,
    data: { capacity: 3, reservable: true },
  },
  {
    type: "table",
    pos: { x: 150.03125, y: 345.8125 },
    rotation: 0,
    data: { capacity: 4, reservable: false },
  },
  {
    type: "table",
    pos: { x: 150.03125, y: 345.8125 },
    rotation: 0,
    data: { capacity: 2, reservable: true },
  },
];

//
// ────────────────────────────────────────────────────────────────
//   SECTION 1 — Reservation API End-to-End Tests
// ────────────────────────────────────────────────────────────────
//
describe("Reservation API", () => {
  let user, rest, tables;
  let restID, userID;
  let tableID, tableID_nr, tableID2;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const setup = await setupRestaurantWithTables(table_data);
    user = setup.user;
    rest = setup.rest;
    tables = setup.tables;

    // REAL table IDs from DB (DO NOT hardcode 0/1/2)
    tableID = tables[0].tableID;
    tableID_nr = tables[1].tableID;
    tableID2 = tables[2].tableID;

    restID = rest.restID;
    userID = user.userID;
  });



  //
  // ────────────────────────────────────────────────
  //   POST /reservation/ticket
  // ────────────────────────────────────────────────
  //

   it("Get available reservation tickets (Sunday — open)", async () => {
    const res = await request(app).post("/v1/reservation/ticket").send({
      restID,
      tableID,
      date_stamp: "2026-12-06",
    });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.tickets)).toBe(true);
    expect(res.body.tickets.length).toBeGreaterThan(0);
  });

  it("Get empty ticket list when restaurant is closed", async () => {
    const res = await request(app).post("/v1/reservation/ticket").send({
      restID,
      tableID,
      date_stamp: "2026-12-07", // Monday closed
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.tickets).toStrictEqual([]);
  });

  it("Fail ticket generation — invalid restaurant", async () => {
    const res = await request(app).post("/v1/reservation/ticket").send({
      restID: 9999,
      tableID,
      date_stamp: "2026-12-06",
    });

    expect(res.statusCode).toBe(404);
  });

  it("Fail ticket generation — invalid date", async () => {
    const res = await request(app).post("/v1/reservation/ticket").send({
      restID,
      tableID,
      date_stamp: "invalid-date",
    });

    expect(res.statusCode).toBe(400);
  });

  it("Fail Ticket generation - table not reservable", async () => {
    const res = await request(app).post("/v1/reservation/ticket").send({
      restID,
      tableID : tableID_nr,
      date_stamp: "2026-12-06",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("This table is not");
  });

  //
  // ────────────────────────────────────────────────
  //   POST /reservation/create
  // ────────────────────────────────────────────────
  //
  it("Create reservation — valid", async () => {
    const res = await request(app).post("/v1/reservation/create").send({
      restID,
      userID,
      tableID: tableID2,
      date_stamp: "2026-12-06T10:00:00",
      capacity: 2,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toContain("Reservation made successfully");
  });

  it("Fail reservation creation — overlapping times", async () => {
    await request(app).post("/v1/reservation/create").send({
      restID,
      userID,
      tableID: tableID2,
      date_stamp: "2026-12-06T12:00:00",
      capacity: 2,
    });

    const res = await request(app).post("/v1/reservation/create").send({
      restID,
      userID,
      tableID: tableID2,
      date_stamp: "2026-12-06T13:00:00",
      capacity: 2,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("already booked");
  });

  it("Fail reservation creation — invalid user", async () => {
    const res = await request(app).post("/v1/reservation/create").send({
      restID,
      userID: 9999,
      tableID,
      date_stamp: "2026-12-06T14:00:00",
      capacity: 2,
    });

    expect(res.statusCode).toBe(404);
  });

  it("Fail reservation creation — invalid date", async () => {
    const res = await request(app).post("/v1/reservation/create").send({
      restID,
      userID,
      tableID,
      date_stamp: "invalid-date",
      capacity: 2,
    });

    expect(res.statusCode).toBe(400);
  });

  it("Fail reservation —  No Guests", async () => {
    const res = await request(app).post("/v1/reservation/create").send({
      restID,
      userID,
      tableID: tableID2,
      date_stamp: "2028-08-06T10:00:00",
      capacity: 0,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Guest Amount must");
  });

  it("Fail reservation — exceeded capacity", async () => {
    const res = await request(app).post("/v1/reservation/create").send({
      restID,
      userID,
      tableID: tableID2,
      date_stamp: "2028-08-06T10:00:00",
      capacity: 5,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("2 allowed for this table");
  });

  it("Fail reservation — table not reservable", async () => {
    const res = await request(app).post("/v1/reservation/create").send({
      restID,
      userID,
      tableID: tableID_nr,
      date_stamp: "2028-08-06T10:00:00",
      capacity: 3,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("This table is not");
  });


  // ────────────────────────────────────────────────
  //   GET routes
  // ────────────────────────────────────────────────

  it("Get user reservations — valid", async () => {
    const res = await request(app).get(`/v1/reservation/user/${userID}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.reservations)).toBe(true);
  });

  it("Get user reservations — invalid user", async () => {
    const res = await request(app).get("/v1/reservation/user/9999");
    expect(res.statusCode).toBe(404);
  });

  it("Get restaurant reservations — valid", async () => {
    const res = await request(app).get(`/v1/reservation/restaurant/${restID}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.reservations)).toBe(true);
  });

  it("Get restaurant reservations — invalid restaurant", async () => {
    const res = await request(app).get("/v1/reservation/restaurant/9999");
    expect(res.statusCode).toBe(404);
  });


  // ────────────────────────────────────────────────
  //   DELETE route
  // ────────────────────────────────────────────────

  it("Delete reservation — valid", async () => {
    await request(app).post("/v1/reservation/create").send({
      restID,
      userID,
      tableID,
      date_stamp: "2026-05-06T18:00:00",
      capacity: 2,
    });

    const pre = await request(app).get(`/v1/reservation/user/${userID}`);
    const reservation = pre.body.reservations[0];

    const res = await request(app)
      .delete(`/v1/reservation/delete/${reservation.reserveID}`)
      .send({ restID, userID });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("successfully removed");
  });

  it("Delete reservation — invalid ID", async () => {
    const res = await request(app)
      .delete("/v1/reservation/delete/9999")
      .send({ restID, userID });

    expect(res.statusCode).toBe(400);
  });
});


// ────────────────────────────────────────────────────────────────
//   SECTION 2 — Concurrency / Double Booking
// ────────────────────────────────────────────────────────────────

// describe("Reservation — double booking & overlap protection", () => {
//   let user, rest, tables;
//   let restID, userID, tableID;

//   beforeAll(async () => {
//     await sequelize.sync({ force: true });

//     const setup = await setupRestaurantWithTables(table_data);
//     user = setup.user;
//     rest = setup.rest;
//     tables = setup.tables;

//     tableID = tables[1].tableID;
//     restID = rest.restID;
//     userID = user.userID;
//   });

//   test("Blocks overlapping or duplicate reservation requests", async () => {
//     const t1 = "2030-05-20T18:00:00";
//     const t2 = "2030-05-20T18:15:00";

//     const req1 = request(app).post("/v1/reservation/create").send({
//       restID,
//       userID,
//       tableID,
//       date_stamp: t1,
//       capacity: 2,
//     });

//     const req2 = request(app).post("/v1/reservation/create").send({
//       restID,
//       userID,
//       tableID,
//       date_stamp: t1,
//       capacity: 2,
//     });

//     const req3 = request(app).post("/v1/reservation/create").send({
//       restID,
//       userID,
//       tableID,
//       date_stamp: t2,
//       capacity: 2,
//     });


//     let result = await Promise.allSettled([req1, req2, req3]);
//     result = result.map((r) => ({ status: r.value.status, body: r.value.body }));

//     const success = result.filter((r) => r.status === 201);
//     const fails = result.filter((r) => r.status !== 201);


//   expect(success.length).toBe(1);
//   expect(fails.length).toBe(2);

//   });
// });

 afterAll(async () => {
    await sequelize.close();
  });

