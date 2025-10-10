// created using chatgpt
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // loads .env if running locally, docker should inject it's own

// Pick DB name based on NODE_ENV, with a fallback
const dbName =
    process.env.DB_NAME ||
    (process.env.NODE_ENV === "test" ? "mydb_test" : "mydb");

const sequelize = new Sequelize(
    dbName,
    process.env.DB_USER || "user",
    process.env.DB_PASS || "password",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false,
    }
);

export default sequelize;
