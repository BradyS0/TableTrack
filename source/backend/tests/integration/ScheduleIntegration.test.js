
import request from "supertest";
import { app } from "../../app.js";

// Data for testing
const restID = 1;
const sched_wed = "{\"schedule\":{\"wednesday\":{\"open\":9.0, \"close\":18.3}}}";
const sched_sun = "{\"schedule\":{\"sunday\":{\"open\":0.0, \"close\":0.0}}}";
const sched_mon = "{\"schedule\":{\"monday\":{\"open\":14.0, \"close\":20.75}}}";

describe("Schedule API", () => {

    // -------------------------------------------------- GET /restaurant/schedule

    it("Get restaurant schedule: open", async () => {
        const res = await request(app)
        .get("/v1/restaurant/schedule")
        .send({
            restID: restID,
            day: "sunday",
        });
        expect(res.body.close).toEqual(24.0);
        expect(res.body.currently_open).toBe(true);
    });

    it("Get restaurant schedule: closed", async () => {
        const res = await request(app)
        .get("/v1/restaurant/schedule")
        .send({
            restID: restID,
            day: "monday",
        });
        expect(res.body.close).toEqual(0.0);
        expect(res.body.currently_open).toBe(false);
    });

    it("Get schedule on invalid day", async () => {
        const res = await request(app)
        .get("/v1/restaurant/schedule")
        .send({
            restID: restID,
            day: "badday",
        });
        expect(res.status).toBe(400);
    });

    // -------------------------------------------------- PUT /restaurant/schedule

    it("Add schedule for Wednesday", async () => {
        const res = await request(app)
        .put("/v1/restaurant/schedule")
        .send({
            restID: restID,
            schedule: sched_wed,
        });
        expect(res.status).toBe(201);

        // Ensure changes made
        //const res2 = await request(app)
        //.get("/v1/restaurant/schedule")
        //.send({
        //    restID: restID,
        //    day: "wednesday",
        //});
        //expect(res2.body.close).toEqual(18.3);

        // Ensure sunday unaffected
        //const res3 = await request(app)
        //.get("v1/restaurant/schedule")
        //.send({
        //    restID: restID,
        //    day: "sunday",
        //});
        //expect(res3.body.close).toEqual(24.0);
    });

    it("Remove schedule for Sunday", async () => {
        const res = await request(app)
        .put("/v1/restaurant/schedule")
        .send({
            restID: restID,
            schedule: sched_sun,
        });
        expect(res.status).toBe(201);

        // Ensure changes made
        //const res2 = await request(app)
        //.get("/v1/restaurant/schedule")
        //.send({
        //    restID: restID,
        //    day: "sunday",
        //});
        //expect(res2.body.close).toEqual(0.0);
    });

    it("Change schedule for Monday", async () => {
        const res = await request(app)
        .put("/v1/restaurant/schedule")
        .send({
            restID: restID,
            schedule: sched_mon,
        });
        expect(res.status).toBe(201);

        // Ensure changes made
        //const res2 = await request(app)
        //.get("/v1/restaurant/schedule")
        //.send({
        //    restID: restID,
        //    day: "monday",
        //});
        //expect(res2.body.close).toEqual(20.75);
    });
});
