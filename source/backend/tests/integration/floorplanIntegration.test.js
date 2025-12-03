
import request from "supertest";
import { app } from "../../app.js";

const restID = 1;

const test_floorplan1 = {
    "floorplan" : [
        {
            "x": 209.03125,
            "y": 151.8125
        },
        {
            "x": 694.03125,
            "y": 151.8125
        },
        {
            "x": 694.03125,
            "y": 370.8125
        },
        {
            "x": 451.03125,
            "y": 370.8125
        },
        {
            "x": 451.03125,
            "y": 480.8125
        },
        {
            "x": 209.03125,
            "y": 480.8125
        }
]};

const test_floorplan2 = {
    "floorplan" : [
        {
            "x": 209.03125,
            "y": 151.8125
        },
        {
            "x": 694.03125,
            "y": 151.8125
        },
        {
            "x": 694.03125,
            "y": 370.8125
        }
]};

const test_floorplan_bad = {
    "floorplan" : [
        {
            "i": 209.03125,
            "j": 151.8125
        },
        {
            "q": "hello world",
            "z": 151.8125
        },
        {
            "t": 694.03125,
            "n": 370.8125
        }
]};

const test_layout1 = {
    "tables": [
        {
            "type": "table",
            "pos": {
                "x": 299.03125,
                "y": 249.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
            }
        },
        {
            "type": "table",
            "pos": {
                "x": 298.03125,
                "y": 395.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
            }
        },
        {
            "type": "table",
            "pos": {
                "x": 500.03125,
                "y": 250.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
            }
        }
    ],
    "misc": [
        {
            "type": "window",
            "pos": {
                "x": 209.03125,
                "y": 241.8125
            },
            "rotation": -90,
            "data": {
                "length": 50
            }
        },
        {
            "type": "window",
            "pos": {
                "x": 694.03125,
                "y": 246.8125
            },
            "rotation": 90,
            "data": {
                "length": 50
            }
        },
        {
            "type": "door",
            "pos": {
                "x": 451.03125,
                "y": 423.8125
            },
            "rotation": 90,
            "data": {
                "length": 80
            }
        }
]};

const test_layout2 = {
    "tables": [
        {
            "type": "table",
            "pos": {
                "x": 299.03125,
                "y": 249.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
            }
        }
    ],
    "misc": [
        {
            "type": "door",
            "pos": {
                "x": 451.03125,
                "y": 423.8125
            },
            "rotation": 90,
            "data": {
                "length": 80
            }
        }
]};


const test_layout_no_tables = {
    "misc": [
        {
            "type": "door",
            "pos": {
                "x": 451.03125,
                "y": 423.8125
            },
            "rotation": 90,
            "data": {
                "length": 80
            }
        }
]};

const test_layout_bad_property = {
    "tables": [
        {
            "type": "table",
            "pos": {
                "x": 299.03125,
                "y": 249.8125
            },
            "rotation": "func_rotate",
            "data": {
                "capacity": 4,
                "reservable": true,
            }
        }
    ],
    "misc": [
        {
            "type": "",
            "pos": {
                "x": "insert x coordinate here",
                "y": 423.8125
            },
            "rotation": 90,
            "data": {
                "length": 80
            }
        }
]};

describe("Floor Plan API", () => {

    // ============================================================ Valid Cases

    // Create and retrieve walls
    it("VALID: Put valid walls", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/walls/${restID}`)
            .send(test_floorplan1);
        expect(res.statusCode).toBe(201);
    });
    it("VALID: Get valid walls", async () => {
        const res = await request(app)
            .get(`/v1/floorplan/walls/${restID}`)
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(test_floorplan1);
    });

    // Create and retrieve layout
    it("VALID: Put valid layout", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/layout/${restID}`)
            .send(test_layout1);
        expect(res.statusCode).toBe(201);
    });
    it("VALID: Get valid layout", async () => {
        const res = await request(app)
            .get(`/v1/floorplan/layout/${restID}`)
            .send();
        expect(res.statusCode).toBe(200);
        // Cant compare table structure because DB adds tableID
        expect(res.body.tables.length).toEqual(test_layout1.tables.length);
        expect(res.body.misc).toEqual(test_layout1.misc);
    });

    // Change and retrieve walls
    it("VALID: Put changed walls", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/walls/${restID}`)
            .send(test_floorplan2);
        expect(res.statusCode).toBe(201);
    });
    it("VALID: Get changed walls", async () => {
        const res = await request(app)
            .get(`/v1/floorplan/walls/${restID}`)
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(test_floorplan2);
    });

    // Change and retrieve layout
    it("VALID: Put changed layout", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/layout/${restID}`)
            .send(test_layout2);
        expect(res.statusCode).toBe(201);
    });
    it("VALID: Get changed layout", async () => {
        const res = await request(app)
            .get(`/v1/floorplan/layout/${restID}`)
            .send();
        expect(res.statusCode).toBe(200);
        // Cant compare table structure because DB adds tableID
        expect(res.body.tables.length).toEqual(test_layout2.tables.length);
        expect(res.body.misc).toEqual(test_layout2.misc);
    });

    // Remove and retrieve layout
    it("VALID: Remove the layout", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/layout/${restID}`)
            .send({ tables : [], misc: [] });
        expect(res.statusCode).toBe(201);
    });
    it("VALID: Get removed layout", async () => {
        const res = await request(app)
            .get(`/v1/floorplan/layout/${restID}`)
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ tables : [], misc: [] });
    });

    // ============================================================ Invalid Cases

    // PUT Walls with invalid restaurant
    it("INVALID: Put walls with invalid restaurant", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/layout/100`)
            .send(test_floorplan1);
        expect(res.statusCode).toBe(404);
    });

    // PUT Walls with invalid property
    it("INVALID: Put walls with invalid property", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/layout/${restID}`)
            .send(test_floorplan_bad);
        expect(res.statusCode).toBe(400);
    });

    // PUT Layout with invalid restaurant
    it("INVALID: Put layout with invalid restaurant", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/layout/100`)
            .send(test_layout1);
        expect(res.statusCode).toBe(404);
    });

    // PUT Layout with missing tables
    it("INVALID: Put layout with missing tables", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/layout/${restID}`)
            .send(test_layout_no_tables);
        expect(res.statusCode).toBe(400);
    });

    // PUT Layout with invalid property
    it("INVALID: Put layout with invalid property", async () => {
        const res = await request(app)
            .put(`/v1/floorplan/layout/${restID}`)
            .send(test_layout_bad_property);
        expect(res.statusCode).toBe(400);
    });

    // GET Walls with invalid restaurant
    it("INVALID: Get walls with invalid restaurant", async () => {
        const res = await request(app)
            .get(`/v1/floorplan/layout/100`)
            .send();
        expect(res.statusCode).toBe(404);
    });

    // GET Layout with invalid restaurant
    it("INVALID: Get layout with invalid restaurant", async () => {
        const res = await request(app)
            .get(`/v1/floorplan/layout/100`)
            .send();
        expect(res.statusCode).toBe(404);
    });
});
