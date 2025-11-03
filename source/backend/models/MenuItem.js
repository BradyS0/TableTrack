
// Database Imports
import { DataTypes } from  "sequelize";
import sequelize from "../db.js";

//Model Definition
export const MenuItem = sequelize.define("MenuItem", {
    itemID:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    restID:      { type: DataTypes.INTEGER, allowNull: false }, //Restaurant / Foreign Key
    name:        { type: DataTypes.STRING,  allowNull: false },
    price:       { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    category:    { type: DataTypes.STRING },
});
