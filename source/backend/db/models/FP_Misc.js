
// Database Imports
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

// ============================================================ Table

// Model Definition
export const FP_Misc = sequelize.define("FP_Misc", {

    // Composite key, restID from the Restaurant table
    miscID: { type: DataTypes.INTEGER, allowNull: false },
    restID:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Restaurant', key: "restID" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },

    // Positional data
    position: { type: DataTypes.JSON,  allowNull: false },
    rotation: { type: DataTypes.FLOAT, allowNull: false },

    // Miscellaneous data
    type: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.JSON,   allowNull: false },
});

// ============================================================ Queries

// Query: Set the misc items in a floorplan
FP_Misc.set_misc = async function(restID, new_misc)
{
    // Remove all existing items from floorplan
    await FP_Misc.destroy({ where: { restID: restID }});

    // Add all new items to the floorplan
    for (let i = 0; i < new_misc.length; i++)
    {
        // Get item from the list
        const item = new_misc[i];

        // Create item in database
        await FP_Misc.create({
            miscID:   i,
            restID:   parseInt(restID),
            position: item.pos,
            rotation: parseFloat(item.rotation),
            type:     item.type,
            data:     item.data,
        });
    }
}

// Query: Get the misc items in a floorplan
FP_Misc.get_misc = async function(restID)
{
    // Get all items from the database
    return await FP_Misc.findAll({ where: { restID: restID }});
}
