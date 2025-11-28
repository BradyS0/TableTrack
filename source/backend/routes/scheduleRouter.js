import express from "express";
import { Schedule, Restaurant } from "../db/models/index.js";
import ScheduleLogic from "../logic/scheduleLogic.js";
import TimeLogic from "../logic/timeLogic.js";

const router = express.Router();

// ================================================================================ POST / PATCH / PUT

// PUT /restaurant/schedule
// Update the schedule of a restaurant
router.put("/", async (req, res) => {
    // Get changed days from request body
    const { restID, schedule } = req.body;

    try {
        // Ensure restaurant exists
        const rest = await Restaurant.get_by_id(parseInt(restID));
        if (!rest)
            return res.status(404).json({ error: "Restaurant cannot be found" });

        if (!(schedule instanceof Object))
            return res.status(400).json({ error: "Invalid schedule format" });

        let changes = 0
        for (let day in schedule) {
            let day_index = ScheduleLogic.get_day_index(day)// get 0-6 or -1 for invalid day
            const { open, close } = schedule[day]

            //skip invalid days or when open or close value exceed 24hrs
            if (day_index < 0 || open > 24 || close > 24) continue //skip this iteration

            if (open > close || open == close || open == -1 || close == -1)
                await Schedule.del_day(restID, day_index)
            else {
                await Schedule.set_day(restID, day_index, open, close);
                changes++;
            }
        }

        return res.status(201).json({ message: `${changes} change${changes > 1 ? 's' : ''} accepted` })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

});



// ================================================================================ GET

// GET /restaurant/schedule
// Get schedule and if open or closed
router.get("/", async (req, res) => {
    // Get restaurant and day from body
    const { restID, day } = req.query;
    try {
        // Ensure restaurant exists
        const rest = await Restaurant.get_by_id(parseInt(restID));
        if (rest === null)
            return res.status(404).json({ error: "Restaurant cannot be found" });

        // Get number for given day (0–6) or -1 if invalid
        const day_num = ScheduleLogic.get_day_index(day)
        if (day_num === -1)
            return res.status(400).json({ error: "Invalid day" });

        // Get opening and closing hours
        const open = await Schedule.get_open(restID, day_num);
        const close = await Schedule.get_close(restID, day_num);

        // Restaurant closed today
        if (open === -1)
            return res.status(200).json({
                open: 0,
                close: 0,
                currently_open: false
            });

        // Restaurant open — determine if it is currently open
        const time = TimeLogic.get_time();
        return res.status(200).json({
            open,
            close,
            currently_open: ScheduleLogic.check_open(time, open, close)
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

});


// GET /restaurant/schedule/weekly
router.get("/weekly/:restID", async (req, res) => {

    // Get restaurant Id from body
    const restID = req.params.restID;
    let schedule = {}

    try {
        // Ensure restaurant exists
        const rest = await Restaurant.get_by_id(parseInt(restID));
        if (!rest)
            return res.status(404).json({ error: "Restaurant cannot be found" });

        for (let i = 0; i < ScheduleLogic.DAYS.length; i++) {
            let day = await Schedule.get_day(restID, i);
            schedule[ScheduleLogic.DAYS[i]] = day
        }

        return res.status(200).json({
            restID: restID,
            schedule: schedule
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message })
    }
});


export default router;

