import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config({ path: './.env' });
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASS:', process.env.DB_PASS ? '******' : 'NOT SET');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false, // can change to console.log to see raw SQL queries
    }
);

// Test the database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log("[INFO] Database connection has been established successfully.");
    } catch (error) {
        console.error("[ERROR] Unable to connect to the database:", error);
    }
})();

export default sequelize;