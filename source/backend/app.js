// partly made using chatGPT
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import restaurantRouter from "./routes/restaurantRouter.js";
import scheduleRouter from "./routes/scheduleRouter.js";
import menuRouter from "./routes/menuRouter.js";
import responseTime from "response-time";

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.ENABLE_PROFILING === "true") {
    app.use(responseTime((req, res, time) => {
        console.log(`[${req.method}] ${req.originalUrl} - ${time.toFixed(2)}ms`);
    }));
}

app.use("/v1/user", userRouter);
app.use("/v1/restaurant/schedule", scheduleRouter);
app.use("/v1/restaurant", restaurantRouter);
app.use("/v1/menu", menuRouter);

export { app };