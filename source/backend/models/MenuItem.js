
// Database Imports
import { DataTypes } from  "sequelize";
import sequelize from "../db.js";

//Model Definition
export const MenuItem = sequelize.define("MenuItem", {
    itemID:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    restID:      { type: DataTypes.INTEGER, allowNull: false }, //Restaurant / Foreign Key
    name:        { type: DataTypes.STRING,  allowNull: false },
    price:       { type: DataTypes.DECIMAL(10,2), allowNull: false },
    description: { type: DataTypes.TEXT },
    category:    { type: DataTypes.STRING },
});

// Query: Create a new menu item
async function create(restID, name, price, desc, category)
{
    try{ // Attempt to create new menu item

        return await MenuItem.create({
            restID: restID,
            name: name,
            price: price,
            description: desc,
            category: category
        });

    }catch{ // Failed to create new menu item

        throw new Error("Failed to create new Menu Item, verify the information provided is correct.");
    }
}

// Query: Get all items from restaurant
async function get_by_restaurant(restID)
{
    return await MenuItem.findAll({
        attributes: [
            "name",
            "price",
            "description",
            "category"
        ], where: { 
            restID: restID
    }});
}

// Query: Get specific item using id
async function get_by_id(restID, itemID)
{
    return await MenuItem.findOne({
        attributes: [
            "name",
            "price",
            "description",
            "category"
        ], where: { 
            itemID: itemID,
            restID: restID
    }});
}

// Query: Update column: name
async function change_name(restID, itemID, name)
{
    return await MenuItem.update({ 
        name: name
    },{ where: { 
        itemID: itemID, 
        restID: restID
    }});
}

// Query: Update column: price
async function change_price(restID, itemID, price)
{
    return await MenuItem.update({ 
        price: price
    },{ where: { 
        itemID: itemID, 
        restID: restID
    }});
}

// Query: Update column: description
async function change_description(restID, itemID, desc)
{
    return await MenuItem.update({ 
        description: desc
    },{ where: { 
        itemID: itemID, 
        restID: restID
    }});
}

// Query: Update column: category
async function change_category(restID, itemID, category)
{
    return await MenuItem.update({ 
        category: category
    },{ where: { 
        itemID: itemID, 
        restID: restID
    }});
}

// Query: Destroy a menu item
async function destroy(restID, itemID)
{
    return await MenuItem.destroy({
        where: { 
            itemID: itemID,
            restID: restID 
    }});
}

export default
{
    create,
    get_by_restaurant,
    get_by_id,
    change_name,
    change_price,
    change_description,
    change_category,
    destroy
}