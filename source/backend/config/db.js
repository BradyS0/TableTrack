// created using copilot
// Load environment variables from the repo .env when running tests or locally
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { Sequelize } from "sequelize";

// Load .env only for local/dev environments when the file exists.
// This keeps production/CI from depending on a local file.
const envPath = path.resolve(process.cwd(), "../.env");
if (process.env.NODE_ENV !== 'production' && fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

// Use DB_PASSWORD from environment (CI/workflow should set DB_PASSWORD)
const dbPassword = process.env.DB_PASSWORD ?? '';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    // Ensure a string is passed (pg SCRAM requires a string)
    typeof dbPassword === 'string' ? dbPassword : String(dbPassword),
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false,
    }
);

// Safe startup log for non-production: show DB host and DB name (do NOT log password)
if (process.env.NODE_ENV !== 'production') {
    console.debug(`DB host: ${process.env.DB_HOST || 'localhost'}, DB name: ${process.env.DB_NAME || ''}`);
}

export default sequelize;
