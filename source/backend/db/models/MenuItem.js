
// Database Imports
import { DataTypes } from  "sequelize";
import sequelize from "../db.js";

//Model Definition
export const MenuItem = sequelize.define("MenuItem", {
    itemID:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    restID:      { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Restaurants', key: "restID" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    name:        { type: DataTypes.STRING,  allowNull: false },
    price:       { type: DataTypes.DECIMAL(10,2), allowNull: false },
    description: { type: DataTypes.TEXT },
    category:    { type: DataTypes.STRING },
});

// Query: Create a new menu item
 MenuItem.create_new = async function (restID, name, price, desc, category)
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
MenuItem.get_by_restaurant = async function (restID)
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
MenuItem.get_by_id = async function (restID, itemID)
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
MenuItem.change_name = async function (restID, itemID, name)
{
    return await MenuItem.update({ 
        name: name
    },{ where: { 
        itemID: itemID, 
        restID: restID
    }});
}

// Query: Update column: price
MenuItem.change_price = async function (restID, itemID, price)
{
    return await MenuItem.update({ 
        price: price
    },{ where: { 
        itemID: itemID, 
        restID: restID
    }});
}

// Query: Update column: description
MenuItem.change_description = async function (restID, itemID, desc)
{
    return await MenuItem.update({ 
        description: desc
    },{ where: { 
        itemID: itemID, 
        restID: restID
    }});
}

// Query: Update column: category
MenuItem.change_category = async function (restID, itemID, category)
{
    return await MenuItem.update({ 
        category: category
    },{ where: { 
        itemID: itemID, 
        restID: restID
    }});
}

// Query: Destroy a menu item
MenuItem.destroy_item = async function (restID, itemID)
{
    return await MenuItem.destroy({
        where: { 
            itemID: itemID,
            restID: restID 
    }});
}
