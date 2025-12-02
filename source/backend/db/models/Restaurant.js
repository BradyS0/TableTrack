// Database Imports
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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
    return await Restaurant.findAll();
}

// Query: Get restaurant using id
Restaurant.get_by_id = async function (id)
{
    return await Restaurant.findOne({ 
        where: { 
            restID: parseInt(id)
    }});
}

// Query: Get restaurant using owner
Restaurant.get_by_owner = async function (ownerID)
{
    return await Restaurant.findOne({ 
        where: { 
            userID: parseInt(ownerID) 
    }});
}

// Query: Get restaurant using address
Restaurant.get_by_address = async function (address)
{
    return await Restaurant.findOne({ 
        where: { 
            address: address 
    }});
}

// Query: Get restaurant using phone
Restaurant.get_by_phone = async function (phone)
{
    return await Restaurant.findOne({ 
        where: { 
            phone: phone
    }});
}
