import { Sequelize } from "sequelize";
import config from './config/config.js';
// config already runs dotenv; config values come from env when set

console.log('DB_USER:', config['username']);
console.log('DB_NAME:', config['database']);
console.log('DB_PASS:', config['password'] ? '******' : 'NOT SET');

let sequelize = new Sequelize(
    config['database'],
    config['username'],
    config['password'],
    {
        host: config['host'] || "localhost",
        dialect: config['dialect'] || "postgres",
        // logging: false, // can change to console.log to see raw SQL queries
    });

export default sequelize;