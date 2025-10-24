
import request from "supertest";
import { app } from "../../app.js";
// import sequelize from "../../db.js";

// Hours string to use for restaurants
const hours = "{\"sunday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
               "\"monday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
              "\"tuesday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
            "\"wednesday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
             "\"thursday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
               "\"friday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
             "\"saturday\":{\"open\":\"6:00\", \"close\":\"12:30\"}}";

// Data used in testing
const user1id = 1
const user2id = 2
const rest1id = 1

describe("Restaurant API", () => {

    // -------------------------------------------------- GET /restaurant

    it("Get a list of existing restaurants", async () => {
        const res = await request(app)
        .get("/v1/restaurant")
        .send();
        expect(res.statusCode).toBe(200);
        var restaurants = res.body.restaurants;
        expect(restaurants.length).toBe(1);
        expect(restaurants[0].name).toBe("TestRestaurant1");
    });

    // -------------------------------------------------- GET /restaurant/{id}

    it("Get the restaurant (Should be TestRestaurant1)", async () => {
        const res = await request(app)
        .get("/v1/restaurant/" + String(rest1id))
        .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("TestRestaurant1");
    });

    it("Get the restaurant with id 5 (Should not exist)", async () => {
        const res = await request(app)
        .get("/v1/restaurant/100")
        .send();
        expect(res.statusCode).toBe(404);
    });

    // -------------------------------------------------- GET /restaurant/user/{id}

    it("Get restaurant by owner - valid", async () => {
        const res = await request(app)
        .get("/v1/restaurant/user/" + String(user1id))
        .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("TestRestaurant1");
    });

    it("Get restaurant by owner - user DNE", async () => {
        const res = await request(app)
        .get("/v1/restaurant/user/100")
        .send();
        expect(res.statusCode).toBe(404);
    });

    it("Get restaurant by owner - restaurant DNE", async () => {
        const res = await request(app)
        .get("/v1/restaurant/user/" + String(user2id))
        .send();
        expect(res.statusCode).toBe(404);
    });

    // -------------------------------------------------- PATCH /restaurant

    it("Change name and description of existing restaurant", async () => {
        const res = await request(app)
        .patch("/v1/restaurant/change")
        .send({
            restID:  rest1id,
            name:    "Bob's Dairy",
            address: "205 Dairy road",
            phone:   "(204) 456-7890",
            desc:    "Ice cream and burgers.",
            hours:   hours
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Bob's Dairy");
        expect(res.body.description).toBe("Ice cream and burgers.");
    });

    it("Change values of existing restaurant to something invalid", async () => {
        const res = await request(app)
        .patch("/v1/restaurant/change")
        .send({
            restID:  rest1id,
            name:    "Burger Queen",
            address: "nope",
            phone:   "(204) 123-4567",
            desc:    "Burgers made by a queen",
            hours:   hours
        });
        expect(res.statusCode).toBe(400);
    });

    it("Change values of non-existant restaurant", async () => {
        const res = await request(app)
        .patch("/v1/restaurant/change")
        .send({
            restID:  10,
            name:    "Macdonald",
            address: "70 Flavor town",
            phone:   "(204) 345-6789",
            desc:    "Try our new 3000 calorie meal",
            hours:   hours
        });
        expect(res.statusCode).toBe(404);
    });

    // -------------------------------------------------- POST /restaurant

    it("Create restaurant with invalid data", async () => {
        const res = await request(app)
        .post("/v1/restaurant")
        .send({
            userID:  user2id,
            name:    "Macdonald",
            address: "nope",
            phone:   "(204) 345-6789"
        });
        expect(res.statusCode).toBe(400);
    });

    it("Create restaurant with non-existant user", async () => {
        const res = await request(app)
        .post("/v1/restaurant")
        .send({
            userID:  100,
            name:    "Macdonald",
            address: "70 Flavor town",
            phone:   "(204) 345-6789"
        });
        expect(res.statusCode).toBe(404);
    });

    it("Create restaurant with user already owning a restaurant", async () => {
        const res = await request(app)
        .post("/v1/restaurant")
        .send({
            userID:  user1id,
            name:    "Macdonald",
            address: "70 Flavor town",
            phone:   "(204) 345-6789"
        });
        expect(res.statusCode).toBe(409);
    });

    it("Create valid restaurant", async () => {
        const res = await request(app)
        .post("/v1/restaurant")
        .send({
            userID:  user2id,
            name:    "Burger Queen",
            address: "100 Burger street",
            phone:   "(204) 234-5678"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Burger Queen");
    });

    // -------------------------------------------------- PATCH /restaurant/description

    it("Change description - valid", async () => {
        const res = await request(app)
        .patch("/v1/restaurant/description")
        .send({
            restID: rest1id,
            description: "edited restaurant description 1"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.description).toBe("edited restaurant description 1");
    });

    it("Change description - invalid description", async () => {
        const res = await request(app)
        .patch("/v1/restaurant/description")
        .send({
            restID: rest1id,
            description: "bad"
        });
        expect(res.statusCode).toBe(400);
    });

    it("Change description - restaurant DNE", async () => {
        const res = await request(app)
        .patch("/v1/restaurant/description")
        .send({
            restID: 100,
            description: "edited restaurant description 2"
        });
        expect(res.statusCode).toBe(404);
    });
});



