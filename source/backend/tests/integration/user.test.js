//file party created using chatGPT
// Ensure test environment is set before importing app/db so config/db.js reads it
process.env.NODE_ENV = "test";
import request from "supertest";
import app from "../../index.js";
import sequelize from "../../config/db.js";
import { User } from "../../models/User.js";

// testing not using babel
// const {request} = require('supertest');
// const {app} = require('../../index.js');
// const {sequelize} = require('../../config/db.js');
// const {}

beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("User API", () => {
    it("creates a user", async () => {
        const res = await request(app)
            .post("/users")
            .send({ name: "Alice", email: "alice@example.com" });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Alice");
    });

    it("fetches all users", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("deletes a user", async () => {
        const user = await User.create({ name: "Bob", email: "bob@example.com" });
        const res = await request(app).delete(`/users/${user.userID}`);
        expect(res.statusCode).toBe(204);
    });

    it("returns 404 when deleting non-existent user", async () => {
        const res = await request(app).delete("/users/9999");
        expect(res.statusCode).toBe(404);
    });

    it("updates a user's name", async () => {
        const user = await User.create({ name: "Charlie", email: "kirk@example.com" });
        const res = await request(app)
            .patch("/users/changeName")
            .send({ userID: user.userID, name: "Charles" });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Name updated");
    });

    it("returns 404 when updating non-existent user", async () => {
        const res = await request(app)
            .patch("/users/changeName")
            .send({ userID: 9999, name: "NoOne" });
        expect(res.statusCode).toBe(404);
    });
});