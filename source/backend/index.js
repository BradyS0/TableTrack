// partly made using chatGPT
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import restaurantRouter from "./routes/restaurantRouter.js";
import sequelize from "./db.js";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1/user", userRouter);
app.use("/v1/restaurant", restaurantRouter);

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

    if (process.env.NODE_ENV !== "test") {
        console.log("Starting server...");
        startServer();
    }
};

run();

export default app; // for supertest