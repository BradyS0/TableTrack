//this file was partially created using copilot
import dotenv from 'dotenv';
import sequelize from './db.js';
import { User } from "./models/User.js";
import { Restaurant } from "./models/Restaurant.js";
import Schedule from "./models/Schedule.js";
import { MenuItem } from './models/MenuItem.js';

// Load environment variables from .env.test
dotenv.config({ path: './.env' });
console.log('TEST DB_PASS:', process.env.DB_PASS ? '******' : 'NOT SET');

beforeAll(async () => {
    try {
        console.log('[TEST SETUP] Resetting the test database...');
        await sequelize.sync({ force: true });
        console.log('[TEST SETUP] Connecting to the test database...');
        await sequelize.authenticate();
        
        //create any necessary test data here
        // console.log('[TEST SETUP] Creating test user...');
        // await User.create({
        //     first_name: 'Test',
        //     last_name: 'User',
        //     email: 'testuser@example.com',
        //     password: 'password123', // You can hash this if needed
        // });

        console.log("[TEST SETUP] Creating test users");
        const user1 = await User.create({
            first_name: "TestUserA",
            last_name:  "LastnameA",
            email:      "testusera@example.com",
            password:   "Password1"
        });
        await User.create({
            first_name: "TestUserB",
            last_name:  "LastnameB",
            email:      "testuserb@example.com",
            password:   "Password2"
        });

        console.log("[TEST SETUP] Creating test restaurants");
        const rest1 = await Restaurant.create({
            userID:    parseInt(user1.userID),
            name:      "TestRestaurant1",
            address:   "100 Test Street",
            phone_num: "(204) 123-4567"
        });

        console.log("[TEST SETUP] Creating test schedule");
        await Schedule.set_day(rest1.restID, 0, 0.0, 24.0); // Always open Sunday
        await Schedule.set_day(rest1.restID, 1, 0.0, 0.0);  // Always closed Monday

        console.log("[TEST SETUP] Creating test menu item");
        await MenuItem.create({
            restID:         parseInt(rest1.restID),
            name:           "TestItem",
            price:          "1.00",
            description:    "Test Description",
            category:       "Test Category"
        });
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