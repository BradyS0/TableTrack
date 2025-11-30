import { app } from "./app.js";
import { sequelize } from "./db/models/index.js";

const PORT = process.env.PORT || process.env.API_PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const startServer = () => {
    app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));
};

const connectWithRetry = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await sequelize.authenticate();
            console.log("Database connection established successfully.");
            await sequelize.sync(); // ensure DB is connected and models are synced
            return;
        } catch (error) {
            console.log(`Failed to connect to database (attempt ${i + 1}/${retries}):`, error.message);
            if (i < retries - 1) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error("Could not connect to database after multiple attempts");
                throw error;
            }
        }
    }
};

const run = async () => {
    await connectWithRetry();
    startServer();
};

run();
