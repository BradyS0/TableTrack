import dotenv from "dotenv";
dotenv.config();

const config = {
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
};

export default config;