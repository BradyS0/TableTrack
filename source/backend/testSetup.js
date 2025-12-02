//this file was partially created using copilot
import dotenv from 'dotenv';
// import sequelize from './db.js';
import { sequelize, User, Restaurant, Schedule, MenuItem } from "./db/models/index.js";
import UserLogic from './logic/userLogic.js';

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

        console.log("[TEST SETUP] Creating test data");

        // ==================== Users

        const hashedPassword1 = await UserLogic.hash_password("Password2!");
        const user1 = await User.create_new("TestUserA", "LastnameA", "testusera@example.com", hashedPassword1);

        const hashedPassword2 = await UserLogic.hash_password("Password3@");
        await User.create_new("TestUserB", "LastnameB", "testuserb@example.com", hashedPassword2);

        // ==================== Restaurants & Schedules

        const rest1 = await Restaurant.create_new(parseInt(user1.userID), "TestRestaurant1", "100 Test Street", "(204) 123-4567", ["testtag"]);
        await Schedule.set_day(rest1.restID, 0, 0.0, 24.0); // Always open Sunday
        await Schedule.set_day(rest1.restID, 1, 0.0, 0.0);  // Always closed Monday

        const rest2 = await Restaurant.create_new(parseInt(user1.userID), "TestRestaurant2", "200 Test Street", "(123) 123-4567", ["testtag"]);
        for (let i = 0; i <= 6; i++) await Schedule.set_day(rest2.restID, i, 9.0, 17.5); // Set schedule every day to 9:00 to 5:30 

        // ==================== Menu Items

        await MenuItem.create_new(rest1.restID, "TestItem", "1.00", "Test Description", "Test Category");
        await MenuItem.create_new(rest1.restID, "To Delete", "0", "To Delete", "To Delete");

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