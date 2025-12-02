import { Sequelize } from "sequelize";
import config from './config/config.js';
// config already runs dotenv; config values come from env when set

console.log('DB_USER:', config['username']);
console.log('DB_NAME:', config['database']);
console.log('DB_PASS:', config['password'] ? '******' : 'NOT SET');
let sequelize;
if (process.env.LOCAL_DB === "true") {
    sequelize = new Sequelize(
        config['database'],
        config['username'],
        config['password'],
        {
            host: config['host'] || "localhost",
            dialect: config['dialect'] || "postgres",
            logging: false, // can change to see raw SQL queries
        });
}else {
    sequelize = new Sequelize(
        config['database'],
        config['username'],
        config['password'],
        {
            host: config['host'] || "localhost",
            port: config['port'] || 5432,
            dialect: config['dialect'] || "postgres",
            logging: false, // can change to see raw SQL queries
            pool: {
                max: 20,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
}
export default sequelize;