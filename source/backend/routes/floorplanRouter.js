
import express from "express";
import FloorplanLogic from "../logic/floorplanLogic.js";
import { FP_Walls, FP_Tables, FP_Misc, Restaurant } from "../db/models/index.js";

const router = express.Router();

// ================================================================================ POST / PATCH / PUT

// PUT /floorplan/walls/<restID>
// Update the walls for the restaurant
router.put("/walls/:id", async (req, res) => {
    try {
        // Retrieve data from body and URL
        const restID = req.params.id;
        const { floorplan } = req.body;

        // Check restaurant exists
        const rest = await Restaurant.get_by_id(parseInt(restID));
        if (!rest) return res.status(404).json({ error: "Restaurant cannot be found" });

        // Validate the input data
        try { FloorplanLogic.validate_walls(floorplan); } 
        catch (err) { return res.status(400).json({ error: err.message }); }

        // Update walls in database
        FP_Walls.set_walls(restID, floorplan);

        return res.status(201).json({ message: "Successfully added walls" });

    } catch (err) { return res.status(500).json({ error: "Unknown Error: Ensure request formatting is correct" }); }
});



// PUT /floorplan/layout/<restID>
// Update the tables/misc for the restaurant
router.put("/layout/:id", async (req, res) => {
    try {
        // Retrieve data from body and URL
        const restID = req.params.id;
        const { tables, misc } = req.body;
        
        // Check restaurant exists
        const rest = await Restaurant.get_by_id(parseInt(restID));
        if (!rest) return res.status(404).json({ error: "Restaurant cannot be found" });

        // Check neither array is null
        if (tables == null || tables == undefined || misc == null || misc == undefined)
            return res.status(400).json({ error: "Tables and Misc cannot be null" });
        
        try { 
            // Validate properties of tables
            for (let i = 0; i < tables.length; i++)
            {
                FloorplanLogic.validate_type((tables[i]).type);
                FloorplanLogic.validate_position((tables[i]).pos);
                FloorplanLogic.validate_rotation((tables[i]).rotation);
                FloorplanLogic.validate_table_data((tables[i]).data);
            }

            // Validate properties of misc
            for (let i = 0; i < misc.length; i++)
            {
                FloorplanLogic.validate_type((misc[i]).type);
                FloorplanLogic.validate_position((misc[i]).pos);
                FloorplanLogic.validate_rotation((misc[i]).rotation);
                FloorplanLogic.validate_data((misc[i]).data);
            }
        } catch (err) { return res.status(400).json({ error: err.message }); }
        
        // Add items to database tables
        await FP_Tables.set_tables(restID, tables);
        await FP_Misc.set_misc(restID, misc);

        return res.status(201).json({ message: "Successfully added layout" });

    } catch (err) { return res.status(500).json({ error: "Unknown Error: Ensure request formatting is correct" }); }
});

// ================================================================================ GET

// GET /floorplan/walls/<restID>
// Retrieve the walls for the restaurant
router.get("/walls/:id", async (req, res) => {
    try{
        // Retrieve data from URL
        const restID = req.params.id;

        // Check restaurant exists
        const rest = await Restaurant.get_by_id(parseInt(restID));
        if (!rest) return res.status(404).json({ error: "Restaurant cannot be found" });

        // Return the walls
        const walls = await FP_Walls.get_walls(restID);
        return res.status(200).json({ floorplan:walls });

    } catch (err) { return res.status(500).json({ error: "Unknown Error: Ensure request formatting is correct" }); }
});



// GET /floorplan/layout/<restID>
// Retrieve the tables/misc for the restaurant
router.get("/layout/:id", async (req, res) => {
    try {
        // Retrieve data from URL
        const restID = req.params.id;

        // Check restaurant exists
        const rest = await Restaurant.get_by_id(parseInt(restID));
        if (!rest) return res.status(404).json({ error: "Restaurant cannot be found" });

        // Return the layout
        const tables = await FP_Tables.get_tables(restID);
        const misc   = await FP_Misc.get_misc(restID);
        return res.status(200).json({ tables:tables, misc:misc });

    } catch (err) { return res.status(500).json({ error: "Unknown Error: Ensure request formatting is correct" }); }
});



export default router;