
import request from "supertest";
import { app } from "../../app.js";
import { MenuItem } from "../../models/MenuItem.js";

const restID = 1;
const itemID = 1;
const invalidID = 0;
const invalidDesc = "x".repeat(201);
const invalidCat = "x".repeat(21);

describe("Menu Item API", () => {
    // ================================================================================ POST
    // valid case
    it("valid item", async () => {
        const res = await request(app)
            .post(`/v1/menu/${restID}`)
            .send({
                name: "Food",
                price: "1.00",
                description: "description",
                category: "category"
            });
        expect(res.statusCode).toBe(201);
        console.log(res.body);
        expect(res.body.name).toBe("Food");
        expect(res.body.price).toBe("1.00");
        expect(res.body.description).toBe("description");
        expect(res.body.category).toBe("category");
    });

    // edge case
    it("invalid restaurant", async () => {
        const res = await request(app)
            .post(`/v1/menu/${invalidID}`)
            .send({
                name: "Food",
                price: "1.00",
                description: "description",
                category: "category"
            });
        expect(res.statusCode).toBe(404);
    });

    // it("restaurant NaN", async () => {
    //     const res = await request(app)
    //         .post("/v1/menu/abc")
    //         .send({
    //             name: "Food",
    //             price: "1.00",
    //             description: "description",
    //             category: "category"
    //         });
    //     expect(res.statusCode).toBe(400);
    // });

    it("invalid name", async () => {
        const res = await request(app)
            .post(`/v1/menu/${restID}`)
            .send({
                name: "",
                price: "1.00",
                description: "description",
                category: "category"
            });
        expect(res.statusCode).toBe(400);
    });

    it("invalid price", async () => {
        const res = await request(app)
            .post(`/v1/menu/${restID}`)
            .send({
                name: "Food",
                price: "abc",
                description: "description",
                category: "category"
            });
        expect(res.statusCode).toBe(400);
    });

    it("invalid description", async () => {
        const res = await request(app)
            .post(`/v1/menu/${restID}`)
            .send({
                name: "Food",
                price: "1.00",
                description: invalidDesc,
                category: "category"
            });
        expect(res.statusCode).toBe(400);
    });

    it("invalid category", async () => {
        const res = await request(app)
            .post(`/v1/menu/${restID}`)
            .send({
                name: "Food",
                price: "1.00",
                description: "description",
                category: invalidCat
            });
        expect(res.statusCode).toBe(400);
    });

    // ================================================================================ GET
    // valid cases
    it("get all", async () => {
        const res = await request(app)
            .get(`/v1/menu/${restID}`)
            .send();
        expect(res.statusCode).toBe(200);
        let menu = res.body.menu;
        expect(menu.length).toBeGreaterThan(0);
        expect(menu[0].name).toBe("TestItem");
    });
    
    it("get one, valid restaurant", async () => {
        const toGet = await MenuItem.create({
            restID: restID,
            name: "To Get",
            price: "0"
        });
        const res = await request(app).get(`/v1/menu/${restID}/${toGet.itemID}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("TestItem");
    });
    
    // edge cases
    it("get all, invalid restaurant", async () => {
        const res = await request(app).get(`/v1/menu/${invalidID}`);
        expect(res.statusCode).toBe(404);
    });
    
    it("get one, invalid restaurant", async () => {
        const res = await request(app).get(`/v1/menu/${invalidID}/${itemID}`);
        expect(res.statusCode).toBe(404);
    });

    it("get one, invalid item", async () => {
        const res = await request(app).get(`/v1/menu/${restID}/${invalidID}`);
        expect(res.statusCode).toBe(404);
    });

    // ================================================================================ PATCH
    // Change name
    // valid case
    it("change name, valid", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/name`)
            .send({
                itemID: itemID,
                name: "Test"
            });
        expect(res.statusCode).toBe(200);
    });
    
    // edge cases
    it("change name, invalid name", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/name`)
            .send({
                itemID: itemID,
                name: ""
            });
        expect(res.statusCode).toBe(400);
    });
    
    it("change name, invalid restaurant", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${invalidID}/change/name`)
            .send({
                itemID: itemID,
                name: "Test"
            });
        expect(res.statusCode).toBe(404);
    });

    it("change name, invalid item", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/name`)
            .send({
                itemID: invalidID,
                name: "Test"
            });
        expect(res.statusCode).toBe(404);
    });

    // price
    // valid case
    it("change price, valid", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/price`)
            .send({
                itemID: itemID,
                price: "$10.00"
            });
        expect(res.statusCode).toBe(200);
    });

    // edge cases
    it("change price, invalid price", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/price`)
            .send({
                itemID: itemID,
                price: ""
            });
        expect(res.statusCode).toBe(400);
    });
 
    it("change price, invalid restaurant", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${invalidID}/change/price`)
            .send({
                itemID: itemID,
                price: "$10.00"
            });
        expect(res.statusCode).toBe(404);
    });
        
    it("change price, invalid item", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/price`)
            .send({
                itemID: invalidID,
                price: "$10.00"
            });
        expect(res.statusCode).toBe(404);
    });

    // description   
    // valid case 
    it("change description, valid", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/description`)
            .send({
                itemID: itemID,
                description: "Test"
            });
        expect(res.statusCode).toBe(200);
    });
    
    //edge cases
    it("change description, invalid description", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/description`)
            .send({
                itemID: itemID,
                description: invalidDesc
            });
        expect(res.statusCode).toBe(400);
    });
    
    it("change description, invalid restaurant", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${invalidID}/change/description`)
            .send({
                itemID: itemID,
                description: "Test"
            });
        expect(res.statusCode).toBe(404);
    });
    
    it("change description, invalid item", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/description`)
            .send({
                itemID: invalidID,
                description: "Test"
            });
        expect(res.statusCode).toBe(404);
    });
    
    // category
    // valid case
    it("change category, valid", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/category`)
            .send({
                itemID: itemID,
                category: "Test"
            });
        expect(res.statusCode).toBe(200);
    });

    // edge cases
    it("change category, invalid category", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/category`)
            .send({
                itemID: itemID,
                category: invalidCat
            });
        expect(res.statusCode).toBe(400);
    });
    
    it("change category, invalid restaurant", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${invalidID}/change/category`)
            .send({
                itemID: itemID,
                category: "Test"
            });
        expect(res.statusCode).toBe(404);
    });
    
    it("change category, invalid item", async () => {
        const res = await request(app)
            .patch(`/v1/menu/${restID}/change/category`)
            .send({
                itemID: invalidID,
                category: "Test"
            });
        expect(res.statusCode).toBe(404);
    });
    
    // ================================================================================ DELETE
    // valid case
    it("delete, valid", async () => {
        const toDelete = await MenuItem.create({
            restID: restID,
            name: "To Delete",
            price: "0",
            description: "To Delete",
            category: "To Delete"
        });
        const res = await request(app).delete(`/v1/menu/${restID}/${toDelete.itemID}`)
        expect(res.statusCode).toBe(204)
    });

    // edge cases
    it("delete, invalid restaurant", async () => {
        const res = await request(app).delete(`/v1/menu/${invalidID}/${itemID}`);
        expect(res.statusCode).toBe(404)
    });
    
    it("delete, invalid item", async () => {
        const res = await request(app).delete(`/v1/menu/${restID}/${invalidID}`);
        expect(res.statusCode).toBe(404);
    });
});