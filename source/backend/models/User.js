//partly made using chatGPT
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";  // updated import

export const User = sequelize.define("User", {
    userID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    },{ freezeTableName: true
    
}); // Sync the model with the database
// (Uncomment the line below if you want to force sync the model each time this file is run)
User.sync({ force: true });
