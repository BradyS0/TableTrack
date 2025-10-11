//this file was created using chatGPT
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || "db",
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT || "postgres",
        logging: false,
    }
);

export default sequelize;
