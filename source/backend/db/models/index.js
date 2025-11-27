import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";
import { Restaurant } from "./Restaurant.js";
import { Schedule } from "./Schedule.js";
import { MenuItem } from "./MenuItem.js";

Restaurant.belongsTo(User, { foreignKey: 'userID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
MenuItem.belongsTo(Restaurant, { foreignKey: 'restID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Schedule.belongsTo(Restaurant, { foreignKey: 'restID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

// Export models and sequelize so other parts of the app can import from a single place
export { sequelize, DataTypes, User, Restaurant, Schedule, MenuItem };

