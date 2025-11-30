
// Database Imports
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

// ============================================================ Table

// Model Definition
export const FP_Walls = sequelize.define("FP_Walls", {

    restID: // Primary key, from the Restaurant table
    {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: 'Restaurant', key: "restID" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },

    // Walls made up of a list of JSON points
    points: { type: DataTypes.ARRAY(DataTypes.JSON), allowNull: false },
});

// ============================================================ Queries

// Query: Set the floorplan
FP_Walls.set_walls = async function(restID, new_walls)
{
    // Find entry with primary key
    const curr_walls = await FP_Walls.findOne({ where: {
        restID: parseInt(restID),
    }});

    if (curr_walls === null) // CASE 1: Walls do not exist, create new
    {
        await FP_Walls.create({
            restID: parseInt(restID),
            points: new_walls,
        });
    }
    else // ------------------- CASE 2: Walls exist, update current value
    {
        await FP_Walls.update({
            point: new_walls,
        },{ where: {
            restID: parseInt(restID),
        }});
    }

    return;
}

// Query: Get the floorplan
FP_Walls.get_walls = async function(restID)
{
    // Find entry with primary key
    const curr_walls = await FP_Walls.findOne({ where: {
        restID: parseInt(restID),
    }});

    // Return array or empty if null
    if (curr_walls == null) return [];
    else return curr_walls;
}
