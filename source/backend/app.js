// partly made using chatGPT
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import restaurantRouter from "./routes/restaurantRouter.js";
import scheduleRouter from "./routes/ScheduleRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1/user", userRouter);
app.use("/v1/restaurant/schedule", scheduleRouter);
app.use("/v1/restaurant", restaurantRouter);

export { app };