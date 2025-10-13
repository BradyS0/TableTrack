// partly made using chatGPT
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import sequelize from "./config/db.js";
import config from "./config/config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

// Lightweight health endpoint for smoke checks
app.get('/health', (req, res) => {
    res.json({ status: 'ok', env: config.env });
});

const startServer = () => {
    app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
};

const run = async () => {
    // Wait for DB to be reachable and authenticated before syncing
    const maxAttempts = 12;
    const delayMs = 5000;
    let attempt = 0;
    while (true) {
        try {
            await sequelize.authenticate();
            console.log('DB authenticated, proceeding to sync');
            break;
        } catch (err) {
            attempt += 1;
            console.error(`DB auth attempt ${attempt} failed: ${err.message}`);
            if (attempt >= maxAttempts) {
                console.error('Exceeded max attempts to authenticate with DB');
                throw err;
            }
            await new Promise((r) => setTimeout(r, delayMs));
        }
    }

    await sequelize.sync(); // ensure DB is connected and models are synced

    if (process.env.NODE_ENV !== "test") {
        startServer();
    }
};

run();

export default app;
