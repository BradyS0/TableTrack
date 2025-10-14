//file party created using chatGPT
import request from "supertest";
import app from "../../index.js";
import sequelize from "../../db.js";
import { User } from "../../models/User.js";

// testing not using babel
// const {request} = require('supertest');
// const {app} = require('../../index.js');
// const {sequelize} = require('../../db.js');
// const {}

beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("User API", () => {
    //CREATING A USER
    //VALID case
    it("create a user with a valid name, email, and password", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@example.com",
                password: "Password1!"
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.first_name).toBe("John");
        expect(res.body.last_name).toBe("Doe");
        expect(res.body.email).toBe("johndoe@example.com")
    });
    
    //EDGE cases (5)
    it("create a user with an invalid first name", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                first_name: "",
                last_name: "Doe",
                email: "janedoe@example.com",
                password: "Password1!"
            });
        expect(res.statusCode).toBe(400);
    });

    it("create a user with an invalid last name", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                first_name: "Jane",
                last_name: "",
                email: "janedoe@example.com",
                password: "Password1!"
            });
        expect(res.statusCode).toBe(400);
    });

    it("create a user with an email with invalid syntax", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                first_name: "Jane",
                last_name: "Doe",
                email: "",
                password: "Password1!"
            });
        expect(res.statusCode).toBe(400);
    });
    
    it("create a user with an email already in use", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                first_name: "Jane",
                last_name: "Doe",
                email: "johndoe@example.com",
                password: "Password1!"
            });
        expect(res.statusCode).toBe(400);
    });

    it("create a user with an invalid password", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                first_name: "Jane",
                last_name: "Doe",
                email: "janedoe@example.com",
                password: ""
            });
        expect(res.statusCode).toBe(400);
    });

    it("fetches all users", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    //LOGIN
    //VALID case
    it("login to an existing user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                email: "johndoe@example.com",
                password: "Password1!"
            });
        expect(res.statusCode).toBe(200);
    });
    
    //EDGE case
    it("login to a non-existent user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                email: "janedoe@example.com",
                password: "Password1!"
            });
        expect(res.statusCode).toBe(401);
    })
    
    //UPDATING A USER
    //VALID cases
    //following tests use the same account to test update
    //starts with
    //first_name: "John"
    //last_name: "Smith"
    //email: johnsmith@example.com
    //password: Password1!
    it("update an existing user's first name with a valid name", async () => {
        await request(app)
            .post("/users")
            .send({
                first_name: "John",
                last_name: "Smith",
                email: "johnsmith@example.com",
                password: "Password1!"
            });
        const res = await request(app)
            .patch("/users/change/firstname")
            .send({ userID: 2, first_name: "Jane" });
        expect(res.statusCode).toBe(200);
    });
        
    it("update an existing user's last name with a valid name", async () => {
        const res = await request(app)
            .patch("/users/change/lastname")
            .send({ userID: 2, name: "Roe" });
        expect(res.statusCode).toBe(200);
    });
    
    it("update an existing user's email with a valid email", async () => {
        const res = await request(app)
            .patch("/users/change/email")
            .send({ userID: 2, email: "janeroe@example.com" });
        expect(res.statusCode).toBe(200);
    });
    
    it("update an existing user's password with the correct old password and a valid new password", async () => {
        const res = await request(app)
            .patch("/users/change/password")
            .send({ userID: 2, old_password: "Password1!", new_password: "Password2@" });
        expect(res.statusCode).toBe(200);
    });
    //now is
    //first_name: "Jane"
    //last_name: "Roe"
    //email: janeroe@example.com
    //password: Password2@
    
    //EDGE cases
    //first name
    it("update an existing user's first name with an invalid name", async () => {
        const res = await request(app)
            .patch("/users/change/firstname")
            .send({ userID: 2, first_name: "" });
        expect(res.statusCode).toBe(400);
    });

    it("update a non-existent user's first name with a valid name", async () => {
        const res = await request(app)
            .patch("/users/change/firstname")
            .send({ userID: 0, last_name: "John" });
        expect(res.statusCode).toBe(404);
    });
    
    //last name
    it("update an existing user's last name with an invalid name", async () => {
        const res = await request(app)
            .patch("/users/change/lastname")
            .send({ userID: 2, last_name: "" });
        expect(res.statusCode).toBe(400);
    });

    it("update a non-existent user's last name with a valid name", async () => {
        const res = await request(app)
            .patch("/users/change/lastname")
            .send({ userID: 0, last_name: "Smith" });
        expect(res.statusCode).toBe(404);
    });
    
    //email
    it("update an existing user's email with an invalid email", async () => {
        const res = await request(app)
            .patch("/users/change/email")
            .send({ userID: 2, email: "" });
        expect(res.statusCode).toBe(400);
    });

    it("update a non-existent user's first name with a valid email", async () => {
        const res = await request(app)
            .patch("/users/change/email")
            .send({ userID: 0, email: "johnsmith@examplemail.com" });
        expect(res.statusCode).toBe(404);
    });
    
    it("update an existing user's email to an email already being used", async () => {
        const res = await request(app)
            .patch("/users/change/email")
            .send({ userID: 2, email: "johndoe@example.com" });
        expect(res.statusCode).toBe(404);
    });

    //password
    it("update an existing user's password with an invalid old password and a valid new password", async () => {
        const res = await request(app)
            .patch("/users/change/password")
            .send({ userID: 0, old_password: "", new_password: "Password1!" });
        expect(res.statusCode).toBe(400);
    });
    
    it("update an existing user's password, but old passwords don't match", async () => {
        const res = await request(app)
            .patch("/users/change/password")
            .send({ userID: 0, old_password: "Password3!", new_password: "Password1!" });
        expect(res.statusCode).toBe(401);
    });

    it("update an existing user's password with the correct old password and an invalid new password", async () => {
        const res = await request(app)
            .patch("/users/change/password")
            .send({ userID: 2, old_password: "Password2@", new_password: "" });
        expect(res.statusCode).toBe(400);
    });

    it("update a non-existent user's password with the correct old password and a valid new password", async () => {
        const res = await request(app)
            .patch("/users/change/password")
            .send({ userID: 0, old_password: "Password2@", new_password: "Password1!" });
        expect(res.statusCode).toBe(404);
    });

    //DELETING A USER
    //VALID case
    it("delete an existing user", async () => {
        const user = await User.create({
                first_name: "Jane",
                last_name: "Doe",
                email: "janedoe@example.com",
                password: "Password1!"
            });
        const res = await request(app).delete(`/users/${user.userID}`);
        expect(res.statusCode).toBe(204);
    });

    //EDGE case
    it("delete a non-existing user", async () => {
        const res = await request(app).delete("/users/0");
        expect(res.statusCode).toBe(404);
    });
});