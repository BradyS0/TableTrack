
import express from "express";
import FloorplanLogic from "../logic/floorplanLogic.js";
import { FP_Walls, FP_Tables, FP_Misc, Restaurant } from "../db/models/index.js";

const router = express.Router();

// ================================================================================ POST / PATCH / PUT

// PUT /floorplan/walls/<restID>
// Update the walls for the restaurant
router.put("/walls/:id", async (req, res) => {

    // Retrieve data from body and URL
    const restID = req.params.id;
    const { walls } = req.body;

    // Check restaurant exists
    const rest = await Restaurant.get_by_id(parseInt(restID));
    if (!rest) return res.status(404).json({ error: "Restaurant cannot be found" });

    // Validate the input data
    try { FloorplanLogic.validate_walls(walls); } 
    catch (err) { return res.status(400).json({ error: err.message }); }

    // Update walls in database
    FP_Walls.set_walls(restID, walls);

    return res.status(201).json({ message: "Successfully added walls" });
});



// PUT /floorplan/layout/<restID>
// Update the tables/misc for the restaurant
router.put("/layout/:id", async (req, res) => {

    // Retrieve data from body and URL
    const restID = req.params.id;
    const { layout } = req.body;

    // Check restaurant exists
    const rest = await Restaurant.get_by_id(parseInt(restID));
    if (!rest) return res.status(404).json({ error: "Restaurant cannot be found" });

    // Validate the input data
    try { JSON.parse(layout); } 
    catch (err) { return res.status(400).json({ error: "Layout must be in JSON format" }); }

    // Separate into tables and misc
    let tables = [];
    let misc   = [];
    for (let i = 0; i < layout.length; i++)
    {
        try { // Validate properties of the item

            // Validate general properties
            FloorplanLogic.validate_type((layout[i]).type);
            FloorplanLogic.validate_position((layout[i]).pos);
            FloorplanLogic.validate_rotation((layout[i]).rotation);

            // Validate specific properties
            if ((layout[i]).type == "table") FloorplanLogic.validate_table_data((layout[i]).data);
            else                             FloorplanLogic.validate_data((layout[i]).data);
        
        // Print error that occured in validation
        } catch (err) { return res.status(400).json({ error: err.message }); }

        // Add item to appropriate list
        if ((layout[i]).type == "table") tables.push(layour[i]);
        else                             misc.push(layout[i]);

        // Add items to database tables
        FP_Tables.set_tables(restID, tables);
        FP_Misc.set_misc(restID, misc);
    }
    return res.status(201).json({ message: "Successfully added layout" });
});

// ================================================================================ GET

// GET /floorplan/walls/<restID>
// Retrieve the walls for the restaurant
router.put("/walls/:id", async (req, res) => {



});

// GET /floorplan/layout/<restID>
// Retrieve the tables/misc for the restaurant
router.get("/layout/:id", async (req, res) => {



});



export default router;