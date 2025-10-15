
import request from "supertest";
import app from "../../index.js";
import sequelize from "../../db.js";



// Data related to created restaurants
let rest1id = 1;
let rest2id = 2;

// Users needed to test Restaurant API
const user1id = 1;
const user2id = 2;

// Hours string to use for restaurants
const hours = "{\"sunday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
               "\"monday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
              "\"tuesday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
            "\"wednesday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
             "\"thursday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
               "\"friday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
             "\"saturday\":{\"open\":\"6:00\", \"close\":\"12:30\"}}";



// Testing setup
beforeAll(async () => {
    process.env.NODE_ENV = "test";         // Set environment to testing
    await sequelize.sync({ force: true }); // Reset tables (use current models)
});

// Testing cleanup
afterAll(async () => {
    await sequelize.close(); // Close database connection
});



describe("Restaurant API", () => {

    // -------------------------------------------------- Create users for testing

    it("Create users for restaurant integration tests", async () => {
        const res1 = await request(app)
        .post("/v1/user")
        .send({
            first_name: "John",
            last_name:  "Doe",
            email:      "emailone@example.com",
            password:   "Password1!"
        });
        const res2 = await request(app)
        .post("/v1/user")
        .send({
            first_name: "Joe",
            last_name:  "Doe",
            email:      "emailtwo@example.com",
            password:   "Password2!"
        });
        expect(res1.statusCode).toBe(201);
        expect(res2.statusCode).toBe(201);
    });

    // -------------------------------------------------- POST /restaurant

    it("Create valid restaurant 1", async () => {
        const res = await request(app)
        .post("/v1/restaurant")
        .send({
            userID:  user1id,
            name:    "Burger Queen",
            address: "100 Burger street",
            phone:   "(204) 123-4567",
            description:    "Burgers made by a queen",
            hours:   hours
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Burger Queen");
        rest1id = res.body.restID;
    });

    it("Create valid restaurant 2", async () => {
        const res = await request(app)
        .post("/v1/restaurant")
        .send({
            userID:  user2id,
            name:    "Dairy King",
            address: "205 Dairy road",
            phone:   "(204) 234-5678",
            description:    "Ice cream made by a king",
            hours:   hours
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Dairy King");
        rest2id = res.body.restID;
    });

    it("Create restaurant with invalid data", async () => {
        const res = await request(app)
        .post("/v1/restaurant")
        .send({
            userID:  100,
            name:    "Macdonald",
            address: "nope",
            phone:   "(204) 345-6789",
            description:    "Try our new 3000 calorie meal",
            hours:   hours
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
            phone:   "(204) 345-6789",
            description:    "Try our new 3000 calorie meal",
            hours:   hours
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
            phone:   "(204) 345-6789",
            description:    "Try our new 3000 calorie meal",
            hours:   hours
        });
        expect(res.statusCode).toBe(409);
    });

    // -------------------------------------------------- GET /restaurant

    it("Get a list of existing restaurants", async () => {
        const res = await request(app)
        .get("/v1/restaurant")
        .send();
        expect(res.statusCode).toBe(200);
        var restaurants = res.body.restaurants;
        expect(restaurants.length).toBe(2);
    });

    // -------------------------------------------------- GET /restaurant/{id}

    it("Get the restaurant with id 1 (Should be Burger Queen)", async () => {
        const res = await request(app)
        .get("/v1/restaurant/1")
        .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Burger Queen");
    });

    it("Get the restaurant with id 5 (Should not exist)", async () => {
        const res = await request(app)
        .get("/v1/restaurant/5")
        .send();
        expect(res.statusCode).toBe(404);
    });

    // -------------------------------------------------- PATCH /restaurant

    it("Change name and description of existing restaurant", async () => {
        const res = await request(app)
        .patch("/v1/restaurant/change")
        .send({
            restID:  rest2id,
            name:    "Bob's Dairy",
            address: "205 Dairy road",
            phone:   "(204) 234-5678",
            description:    "Due to the revolution, the king has been replaced by Bob.",
            hours:   hours
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Bob's Dairy");
        expect(res.body.description).toBe("Due to the revolution, the king has been replaced by Bob.");
    });

    it("Change values of existing restaurant to something invalid", async () => {
        const res = await request(app)
        .patch("/v1/restaurant/change")
        .send({
            restID:  rest1id,
            name:    "Burger Queen",
            address: "nope",
            phone:   "(204) 123-4567",
            description:    "Burgers made by a queen",
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
            description:    "Try our new 3000 calorie meal",
            hours:   hours
        });
        expect(res.statusCode).toBe(404);
    });
});

