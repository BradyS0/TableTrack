//this file was partially created using copilot
import dotenv from 'dotenv';
import sequelize from './db.js';
import { User } from './models/User.js';

// Load environment variables from .env.test
dotenv.config({ path: './.env' });
console.log('TEST DB_PASS:', process.env.DB_PASS ? '******' : 'NOT SET');

async function resetDatabaseWithRetry(retries = 5, delay = 5000) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log('[TEST SETUP] Resetting the test database...');
            await sequelize.sync({ force: true });
            sleep(5000); // wait for 5 seconds to ensure DB is ready
            console.log('[TEST SETUP] Test database reset complete.');
            return;
        } catch (error) {
            console.log(`[TEST SETUP] Failed to reset database (attempt ${i + 1}/${retries}):`, error.message);
            if (i < retries - 1) {
                console.log(`[TEST SETUP] Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error('[TEST SETUP] Could not reset database after multiple attempts.');
                throw error;
            }
        }
    }
}

beforeAll(async () => {
    try {
        console.log('[TEST SETUP] Connecting to the test database...');
        await sequelize.authenticate();
        console.log('[TEST SETUP] Database connection established.')
        
        await resetDatabaseWithRetry();

        //create any necessary test data here
        // console.log('[TEST SETUP] Creating test user...');
        // await User.create({
        //     first_name: 'Test',
        //     last_name: 'User',
        //     email: 'testuser@example.com',
        //     password: 'password123', // You can hash this if needed
        // });

        //for future use
        // console.log('[TEST SETUP] Running migrations...');
        // If you're using Sequelize migrations, you can run them here
        // Uncomment the following line if you have migrations set up
        // await sequelize.getQueryInterface().createTable('Users', { /* table definition */ });

        console.log('[TEST SETUP] Test database is ready.');
    } catch (error) {
        console.error('[TEST SETUP] Failed to set up the test database:', error);
        throw error;
    }
});

afterAll(async () => {
    try {
        console.log('[TEST TEARDOWN] Closing database connection...');
        await sequelize.close();
        console.log('[TEST TEARDOWN] Database connection closed.');
    } catch (error) {
        console.error('[TEST TEARDOWN] Failed to close the database connection:', error);
    }
});