// Database Imports
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { Schedule } from "./index.js";
import timeLogic from "../../logic/timeLogic.js";

// Model Definition
export const Restaurant = sequelize.define("Restaurant", {
    restID:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID:      { 
        type: DataTypes.INTEGER, 
        allowNull: false, // Owner / Foreign key — restaurant requires a user
        // reference the users table by name to avoid importing User here
        references: { model: 'Users', key: "userID" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    name:        { type: DataTypes.STRING,  allowNull: false },
    address:     { type: DataTypes.STRING,  allowNull: false, unique: true },
    phone:       { type: DataTypes.STRING,  allowNull: false, unique: true },
    tags:        { type: DataTypes.ARRAY(DataTypes.STRING),  defaultValue: ["no-tags-created"] },
    description: { type: DataTypes.TEXT, defaultValue: "" },
    logo:        { type: DataTypes.STRING, defaultValue: "" }, // Filepath to image
});

// Helper to attach open hours
async function add_open_hours(rest)
{
    // If rest null do nothing
    if (!rest) return rest;

    // Get day from time logic
    const day = timeLogic.get_day();

    // Format schedule data
    rest = rest.toJSON();
    const open  = await Schedule.get_open(rest.restID, day);
    const close = await Schedule.get_close(rest.restID, day);
    if (open >= 0 && close >= 0 && open < close) {
        const open_str = String(parseInt(open)) + ":" + String((open % 1) * 60).padStart(2, '0');
        const close_str = String(parseInt(close)) + ":" + String((close % 1) * 60).padStart(2, '0');
        rest.hours = open_str + " - " + close_str;
    } else {
        rest.hours = "Closed";
    }
    return rest;
}

// Query: Create a new restaurant
Restaurant.create_new = async function (ownerID, name, address, phone, tags)
{
    try{ // Attempt to create the restaurant

        return await Restaurant.create({
            userID: ownerID,
            name: name,
            address: address,
            phone: phone,
            tags: tags
        });

    }catch{ // Failed to create the restaurant

        throw new Error("Failed to create new restaurant, verify the information provided is correct.");
    }
}

// Query: Update column: name
Restaurant.change_name = async function (id, name)
{
    return await Restaurant.update({ 
            name: name 
        },{ where: { 
            restID: id 
    }});
}

// Query: Update column: address
Restaurant.change_address = async function (id, address)
{
    return await Restaurant.update({ 
            address: address
        },{ where: { 
            restID: id 
    }});
}

// Query: Update column: phone
Restaurant.change_phone = async function (id, phone)
{
    return await Restaurant.update({ 
            phone: phone
        },{ where: { 
            restID: id 
    }});
}

// Query: Update column: description
Restaurant.change_description = async function (id, desc)
{
    return await Restaurant.update({ 
            description: desc
        },{ where: { 
            restID: id 
    }});
}

// Query: Update column: tags
Restaurant.change_tags = async function (id, tags)
{
    return await Restaurant.update({ 
            tags: tags
        },{ where: { 
            restID: id 
    }});
}

// Query: List of all restaurants
Restaurant.get_all = async function ()
{
    let rest_list = await Restaurant.findAll();
    for (let i = 0; i < rest_list.length; i++)
        rest_list[i] = await add_open_hours(rest_list[i]);
    return rest_list;
}

// Query: Get restaurant using id
Restaurant.get_by_id = async function (id)
{
    let rest = await Restaurant.findOne({ 
        where: { 
            restID: parseInt(id)
    }});
    rest = await add_open_hours(rest);
    return rest;
}

// Query: Get restaurant using owner
Restaurant.get_by_owner = async function (ownerID)
{
    let rest = await Restaurant.findOne({ 
        where: { 
            userID: parseInt(ownerID) 
    }});
    rest = await add_open_hours(rest);
    return rest;
}

// Query: Get restaurant using address
Restaurant.get_by_address = async function (address)
{
    let rest = await Restaurant.findOne({ 
        where: { 
            address: address 
    }});
    rest = await add_open_hours(rest);
    return rest;
}

// Query: Get restaurant using phone
Restaurant.get_by_phone = async function (phone)
{
    let rest = await Restaurant.findOne({ 
        where: { 
            phone: phone
    }});
    rest = await add_open_hours(rest);
    return rest;
}
