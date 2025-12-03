// partly made using chatGPT
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import restaurantRouter from "./routes/restaurantRouter.js";
import scheduleRouter from "./routes/scheduleRouter.js";
import menuRouter from "./routes/menuRouter.js";
import floorplanRouter from "./routes/floorplanRouter.js";
import responseTime from "response-time";

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';

let allowed_website_urls = [];

if(NODE_ENV === 'development'){
    allowed_website_urls = ["http://localhost:5500","http://127.0.0.1:5500"];
}else if (NODE_ENV === 'production'){
    allowed_website_urls = ["https://tabletrack.netlify.app"];
}

app.use(cors({
    origin: allowed_website_urls,
    credentials: true
}));
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
app.use("/v1/floorplan", floorplanRouter);

export { app };