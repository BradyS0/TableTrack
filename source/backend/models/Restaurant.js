
// Database Imports
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

// Model Definition
export const Restaurant = sequelize.define("Restaurant", {
    restID:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID:      { type: DataTypes.INTEGER, allowNull: false }, // Owner / Foreign key
    name:        { type: DataTypes.STRING,  allowNull: false },
    address:     { type: DataTypes.STRING,  allowNull: false, unique: true },
    phone:       { type: DataTypes.STRING,  allowNull: false, unique: true },
    tags:        { type: DataTypes.ARRAY(DataTypes.STRING),  defaultValue: ["no-tags-created"] },
    description: { type: DataTypes.TEXT, defaultValue: "" },
    logo:        { type: DataTypes.STRING, defaultValue: "" }, // Filepath to image
});

// Query: Create a new restaurant
async function create(ownerID, name, address, phone, tags)
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
async function change_name(id, name)
{
    return await Restaurant.update({ 
            name: name 
        },{ where: { 
            restID: id 
    }});
}

// Query: Update column: address
async function change_address(id, address)
{
    return await Restaurant.update({ 
            address: address
        },{ where: { 
            restID: id 
    }});
}

// Query: Update column: phone
async function change_phone(id, phone)
{
    return await Restaurant.update({ 
            phone: phone
        },{ where: { 
            restID: id 
    }});
}

// Query: Update column: description
async function change_description(id, desc)
{
    return await Restaurant.update({ 
            description: desc
        },{ where: { 
            restID: id 
    }});
}

// Query: Update column: tags
async function change_tags(id, tags)
{
    return await Restaurant.update({ 
            tags: tags
        },{ where: { 
            restID: id 
    }});
}

// Query: List of all restaurants
async function get_all()
{
    return await Restaurant.findAll();
}

// Query: Get restaurant using id
async function get_by_id(id)
{
    return await Restaurant.findOne({ 
        where: { 
            restID: parseInt(id)
    }});
}

// Query: Get restaurant using owner
async function get_by_owner(ownerID)
{
    return await Restaurant.findOne({ 
        where: { 
            userID: parseInt(ownerID) 
    }});
}

// Query: Get restaurant using address
async function get_by_address(address)
{
    return await Restaurant.findOne({ 
        where: { 
            address: address 
    }});
}

// Query: Get restaurant using phone
async function get_by_phone(phone)
{
    return await Restaurant.findOne({ 
        where: { 
            phone: phone
    }});
}

export default
{
    create,
    change_name,
    change_address,
    change_phone,
    change_description,
    change_tags,
    get_all,
    get_by_id,
    get_by_owner,
    get_by_address,
    get_by_phone
}