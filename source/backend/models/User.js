//partly made using chatGPT
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";  // updated import

export const User = sequelize.define("User", {
    userID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
});
