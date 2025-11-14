
import express from "express";
import { Schedule, Restaurant } from "../models";
import ScheduleLogic from "../logic/ScheduleLogic.js";
import TimeLogic from "../logic/TimeLogic.js";

const router = express.Router();

// ================================================================================ POST / PATCH / PUT

// PUT /restaurant/schedule
// Update the schedule of a restaurant
router.put("/", async (req, res) => {

    // Get changed days from request body
    const { restID, schedule } = req.body;

    // Ensure restaurant exists
    const rest = await Restaurant.findByPk(parseInt(restID));
    if ( rest === null ) res.status(404).json({ error: "Restaurant cannot be found" });
    else {

        // Parse days into easier to use format
        var parsed = null;
        try { parsed = ScheduleLogic.parse_schedule(schedule); } 
        catch { res.status(400).json({ error: "Invalid schedule format" }); }
        if (parsed != null) {

            // Update all days specified by request
            for (var i = 0; i < 7; i++)
            {
                if ((parsed[i])[0] >= 0 && (parsed[i])[0] <= 24)
                {
                    const open  = (parsed[i])[0];
                    const close = (parsed[i])[1];

                    // CASE 1: Restaurant is open today
                    if (open < close) await Schedule.set_day(restID, i, open, close);

                    // CASE 2: Restaurant is closed today
                    else await Schedule.del_day(restID, i);
                }
            }
            res.status(201).json({});
        }
    }
});

// ================================================================================ GET

// GET /restaurant/schedule
// Get schedule and if open or closed
router.get("/", async (req, res) => {

    // Get restaurant and day from body
    const { restID, day } = req.body;

    // Ensure restaurant exists
    const rest = await Restaurant.findByPk(parseInt(restID));
    if ( rest === null ) res.status(404).json({ error: "Restaurant cannot be found" });
    else {

        // Get number for given day
        var day_num = -1;
        if      (day == "sunday")    day_num = 0;
        else if (day == "monday")    day_num = 1;
        else if (day == "tuesday")   day_num = 2;
        else if (day == "wednesday") day_num = 3;
        else if (day == "thursday")  day_num = 4;
        else if (day == "friday")    day_num = 5;
        else if (day == "saturday")  day_num = 6;

        if ( day_num == -1 ) res.status(400).json({ error: "Invalid day" });
        else {

            // Get opening and closing hours
            var open  = await Schedule.get_open(restID, day_num);
            var close = await Schedule.get_close(restID, day_num);

            // Restaurant closed today
            if (open == -1) {
                res.status(200).json({ open:0, close:0, currently_open:false });
            }
            else {

                // Check if currently open
                var time = TimeLogic.get_time();
                res.status(200).json({ open:open, close:close, currently_open:ScheduleLogic.check_open(time,open,close) })
            }
        }
    }
});



export default router;

