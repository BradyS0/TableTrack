import dotenv from "dotenv";
dotenv.config();

const config = {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
};

export default config;

// NOTE: file rewritten to normalize filesystem metadata for Docker build context