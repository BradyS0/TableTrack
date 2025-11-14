
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
    tags:        { type: DataTypes.ARRAY(DataTypes.STRING),  defaultValue: ["no-tags-created"]},
    description: { type: DataTypes.TEXT },
    open_hours:  { type: DataTypes.TEXT },
    logo:        { type: DataTypes.STRING }, // Filepath to image
});
