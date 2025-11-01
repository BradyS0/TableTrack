
// Database Imports
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

// Model Definition
const Schedule = sequelize.define("Schedule", {
    restID:  { type: DataTypes.INTEGER, primaryKey: true },
    day:     { type: DataTypes.INTEGER, primaryKey: true },
    open:    { type: DataTypes.INTEGER, allowNull: false },
    close:   { type: DataTypes.INTEGER, allowNull: false },
});

// Query: Add / update a day
async function set_day(restID, day, open, close)
{
    // Find entry with primary key
    const day = await Schedule.findOne({ where: {
        restID: parseInt(restID),
        day:    parseInt(day),
    }});

    if (day === null) // CASE 1: Schedule does not exist -> create day
    {
        var new_day = await Schedule.create({
            restID: parseInt(restID),
            day:    parseInt(day),
            open:   parseInt(open),
            close:  parseInt(close),
        });
        return new_day;
    }
    else // ------------ CASE 2: Schedule already exists -> update day
    {
        var new_day = await Restaurant.update({
            open:  parseInt(open),
            close: parseInt(close),
        },{ where: {
            restID: parseInt(restID),
            day:    parseInt(day),
        }});
        return new_day;
    }
}

// Query: Delete a day
async function del_day(restID, day)
{
    // Delete entry with primary key
    await Schedule.destroy({ where: {
        restID: parseInt(restID),
        day:    parseInt(day),
    }});
}

// Query: Get the opening hour
async function get_open(restID, day)
{
    // Find entry with primary key
    const day = await Schedule.findOne({ where: {
        restID: parseInt(restID),
        day:    parseInt(day),
    }});

    // If day exists return open hour
    if (day !== null) return day.open;
    else return -1;
}

// Query: Get the closing hour
async function get_close(restID, day)
{
    // Find entry with primary key
    const day = await Schedule.findOne({ where: {
        restID: parseInt(restID),
        day:    parseInt(day),
    }});

    // If day exists return close hour
    if (day !== null) return day.close;
    else return -1;
}

export default
{
    set_day,
    del_day,
    get_open,
    get_close
};