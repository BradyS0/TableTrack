import { Sequelize } from "sequelize";
import config from './config/config.js';
// dotenv.config({ path: './.env' });
console.log('DB_USER:', config['production']['username']);
console.log('DB_NAME:', config['production']['database']);
console.log('DB_PASS:', config['production']['password'] ? '******' : 'NOT SET');

const sequelize = new Sequelize(
    config['production']['database'],
    config['production']['username'],
    config['production']['password'],
    {
        host: config['production']['host'] || "localhost",
        dialect: config['production']['dialect'] || "postgres",
        logging: false, // can change to console.log to see raw SQL queries
    }
);

// // Test the database connection
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log("[INFO] Database connection has been established successfully.");
//     } catch (error) {
//         console.error("[ERROR] Unable to connect to the database:", error);
//     }
// })();

export default sequelize;