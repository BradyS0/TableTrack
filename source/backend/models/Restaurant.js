
// Database Imports
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

// Model Definition
export const Restaurant = sequelize.define("Restaurant", {
    restID:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID:      { type: DataTypes.INTEGER, allowNull: false }, // Owner / Foreign key
    name:        { type: DataTypes.STRING,  allowNull: false },
    address:     { type: DataTypes.STRING,  allowNull: false, unique: true },
    phone_num:   { type: DataTypes.STRING,  allowNull: false, unique: true },
    description: { type: DataTypes.TEXT,  allowNull: false },
    open_hours:  { type: DataTypes.TEXT,  allowNull: false },
    logo:        { type: DataTypes.STRING }, // Filepath to image
});
