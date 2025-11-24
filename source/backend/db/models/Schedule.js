
// Database Imports
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

// Model Definition
export const Schedule = sequelize.define("Schedule", {
    restID:  { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { model: 'Restaurants', key: "restID" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
     },
    day:     { type: DataTypes.INTEGER, primaryKey: true },
    open:    { type: DataTypes.FLOAT, allowNull: false },
    close:   { type: DataTypes.FLOAT, allowNull: false },
});

// Query: Add / update a day
Schedule.set_day = async function (restID, day, open, close)
{
    // Find entry with primary key
    var sched = await Schedule.findOne({ where: {
        restID: parseInt(restID),
        day:    parseInt(day),
    }});

    var new_day = null;
    if (sched === null) // CASE 1: Schedule does not exist -> create day
    {
        new_day = await Schedule.create({
            restID: parseInt(restID),
            day:    parseInt(day),
            open:   parseFloat(open),
            close:  parseFloat(close),
        });
    }
    else // ------------ CASE 2: Schedule already exists -> update day
    {
        new_day = await Schedule.update({
            open:  parseFloat(open),
            close: parseFloat(close),
        },{ where: {
            restID: parseInt(restID),
            day:    parseInt(day),
        }});
    }
    return new_day;
}

// Query: Delete a day
Schedule.del_day = async function (restID, day)
{
    // Delete entry with primary key
    await Schedule.destroy({ where: {
        restID: parseInt(restID),
        day:    parseInt(day),
    }});
    return 0;
}

// Query: Get the opening hour
Schedule.get_open = async function (restID, day)
{
    // Find entry with primary key
    const sched = await Schedule.findOne({ where: {
        restID: parseInt(restID),
        day:    parseInt(day),
    }});

    // If day exists return open hour
    if (sched !== null) return sched.open;
    else return -1;
}

// Query: Get the closing hour
Schedule.get_close = async function (restID, day)
{
    // Find entry with primary key
    const sched = await Schedule.findOne({ where: {
        restID: parseInt(restID),
        day:    parseInt(day),
    }});

    // If day exists return close hour
    if (sched !== null) return sched.close;
    else return -1;
}
