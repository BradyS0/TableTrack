
// Database Imports
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

// ============================================================ Table

// Model Definition
export const FP_Tables = sequelize.define("FP_Tables", {

    // Composite key, restID from the Restaurant table
    tableID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    restID:
    {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
        references: { model: 'Restaurants', key: "restID" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },

    // Positional data
    position: { type: DataTypes.JSON,  allowNull: false },
    rotation: { type: DataTypes.FLOAT, allowNull: false },

    // Table data
    capacity:   { type: DataTypes.INTEGER, allowNull: false },
    reservable: { type: DataTypes.BOOLEAN, allowNull: false },
});

// ============================================================ Queries

// Query: Set the tables in a floorplan
FP_Tables.set_tables = async function(restID, new_tables)
{
    // Remove all existing tables from floorplan
    await FP_Tables.destroy({ where: { restID: restID }});

    // Add all new tables to the floorplan
    for (let i = 0; i < new_tables.length; i++)
    {
        // Get table from the list
        const table = new_tables[i];

        // Create object in database
        await FP_Tables.create({
            tableID: i+1,
            restID: parseInt(restID),
            position: table.pos,
            rotation: parseFloat(table.rotation),
            capacity: parseInt(table.data.capacity),
            reservable: table.data.reservable,
        });
    }
}

// Query: Get the tables in a floorplan
FP_Tables.get_tables = async function(restID)
{
    // Get all tables from the database
    const table_list = await FP_Tables.findAll({ where: { restID: restID }});
    
    // Format each table for the frontend
    let formatted_list = [];
    for (let i = 0; i < table_list.length; i++)
    {
        // Get table data, create JSON
        const table = table_list[i];
        let formatted_table = {};

        // Add basic data to the new table
        formatted_table.tableID  = table.tableID;
        formatted_table.type     = "table";
        formatted_table.pos      = table.position;
        formatted_table.rotation = table.rotation;

        // Add table data to the new table
        let data = {};
        data.capacity   = table.capacity;
        data.reservable = table.reservable;
        formatted_table.data = data;

        // Add formatted table to array
        formatted_list.push(formatted_table);
    }
    return formatted_list;
}


FP_Tables.get_a_table = async function(restID,tableID)
{
    // Get all tables from the database
    const table = await FP_Tables.findOne({ where: { restID: restID, tableID: tableID }});
    
    if (!table)
        throw new Error("Table does not exist")
    
        let formatted_table = {};

        // Add basic data to the new table
        formatted_table.tableID  = table.tableID;
        formatted_table.type     = "table";
        formatted_table.pos      = table.position;
        formatted_table.rotation = table.rotation;

        // Add table data to the new table
        let data = {};
        data.capacity   = table.capacity;
        data.reservable = table.reservable;
        formatted_table.data = data;

    return formatted_table;
}
