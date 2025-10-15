// partly made using chatGPT
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import restaurantRouter from "./routes/restaurantRouter.js";
// import sequelize from "./db.js";
import sequelize, { config } from "./config/config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1/user", userRouter);
app.use("/v1/restaurant", restaurantRouter);

const startServer = () => {
    app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
};

const run = async () => {
    await sequelize.sync(); // ensure DB is connected and models are synced

    if (process.env.NODE_ENV !== "test") {
        startServer();
    }
};

run();

export default app; // for supertest