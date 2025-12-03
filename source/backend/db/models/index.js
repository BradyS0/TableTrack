import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";
import { Restaurant } from "./Restaurant.js";
import { Schedule } from "./Schedule.js";
import { MenuItem } from "./MenuItem.js";
import { FP_Walls } from "./FP_Walls.js";
import { FP_Tables } from "./FP_Tables.js";
import { FP_Misc } from "./FP_Misc.js";

Restaurant.belongsTo(User, { foreignKey: 'userID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
MenuItem.belongsTo(Restaurant, { foreignKey: 'restID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Schedule.belongsTo(Restaurant, { foreignKey: 'restID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
FP_Walls.belongsTo(Restaurant, { foreignKey: 'restID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
FP_Tables.belongsTo(Restaurant, { foreignKey: 'restID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
FP_Misc.belongsTo(Restaurant, { foreignKey: 'restID', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

// Export models and sequelize so other parts of the app can import from a single place
export { sequelize, DataTypes, User, Restaurant, Schedule, MenuItem, FP_Walls, FP_Tables, FP_Misc };

