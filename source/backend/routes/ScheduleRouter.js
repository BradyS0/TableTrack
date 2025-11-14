
import express from "express";
import ScheduleModel from "../models/Schedule.js";
import { Restaurant } from "../models/Restaurant.js";
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
        let parsed = null;
        try { parsed = ScheduleLogic.parse_schedule(schedule); } 
        catch { res.status(400).json({ error: "Invalid schedule format" }); }
        if (parsed != null) {

            // Update all days specified by request
            for (let i = 0; i < ScheduleLogic.DAYS.length; i++)
            {
                if ((parsed[i])[0] >= 0 && (parsed[i])[0] <= 24)
                {
                    const open  = (parsed[i])[0];
                    const close = (parsed[i])[1];

                    // CASE 1: Restaurant is open today
                    if (open < close) await ScheduleModel.set_day(restID, i, open, close);

                    // CASE 2: Restaurant is closed today
                    else await ScheduleModel.del_day(restID, i);
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
        //returns -1 for invalid day
        //returns 0-6 for sunday-saturday
        let day_num = ScheduleLogic.DAYS.indexOf(day.toLowerCase())

        if ( day_num == -1 ) res.status(400).json({ error: "Invalid day" });
        else {

            // Get opening and closing hours
            let open  = await ScheduleModel.get_open(restID, day_num);
            let close = await ScheduleModel.get_close(restID, day_num);

            // Restaurant closed today
            if (open == -1) {
                res.status(200).json({ open:0, close:0, currently_open:false });
            }
            else {

                // Check if currently open
                let time = TimeLogic.get_time();
                res.status(200).json({ open:open, close:close, currently_open:ScheduleLogic.check_open(time,open,close) })
            }
        }
    }
});


// GET /restaurant/schedule/weekly
router.get("/", async (req, res) => {

    // Get restaurant Id from body
    const {restID} = req.body;
    const schedule = {}

    // Ensure restaurant exists
    const rest = await Restaurant.findByPk(parseInt(restID));
    if (!rest) 
        return res.status(404).json({ error: "Restaurant cannot be found" });

    for (let i=0; i < ScheduleLogic.DAYS.length; i++){
        let open  = await ScheduleModel.get_open(restID, i);
        let close = await ScheduleModel.get_close(restID, i);
        schedule[ScheduleLogic.DAYS[i]] = {open,close}
    }

    return res.status(200).json({restID,schedule})
});


export default router;

