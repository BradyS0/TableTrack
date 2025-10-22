import { app } from "./app.js";
import sequelize from "./db.js";

const PORT = 3000;

const startServer = () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
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
