
import express from "express";
import { User } from "../models/User.js";
import { Restaurant } from "../models/Restaurant.js";
import RestaurantLogic from "../logic/restaurantLogic.js";

const router = express.Router();

// ================================================================================ POST / PUT

// POST /restaurant
// Create a new restaurant
router.post("/", async (req, res) => {
    try {
        // Retrieve and validate information from body
        const { userID, name, address, phone, } = req.body;
        if ( !RestaurantLogic.validate_name(name) )
            res.status(400).json({ error: "Invalid name" });
        else if ( !RestaurantLogic.validate_address(address) )
            res.status(400).json({ error: "Invalid address" });
        else if ( !RestaurantLogic.validate_phone(phone) )
            res.status(400).json({ error: "Invalid phone" })
        else
        {
            // Check that owner of restaurant exists
            const user = await User.findByPk(parseInt(userID));
            if ( user === null )
                res.status(404).json({ error: "User cannot be found" });
            else
            {
                // Check that owner doesnt already have a restaurant
                const prev_restaurant = await Restaurant.findOne({ where: { userID: parseInt(userID) } });
                if ( prev_restaurant !== null )
                    res.status(409).json({ error: "User already has restaurant" });
                else
                {
                    // Create the new restaurant
                    const new_restaurant = await Restaurant.create({
                        userID: userID,
                        name: name,
                        address: address,
                        phone_num: phone,
                        description: "",
                        open_hours: "",
                        logo: ""
                    });
                    new_restaurant.tags = ["temp_tag"]; // <---------- REMOVE ONCE TAGS HAVE BEEN ADDED
                    res.status(201).json(new_restaurant);
                }
            }
        }
    }
    catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



// PUT /restaurant/description
// Edit description of a restaurant
router.put("/description", async (req, res) => {
    try {
        // Retrieve and validate information from body
        const { restID, description, } = req.body;
        if ( !RestaurantLogic.validate_description(description) )
            res.status(400).json({ error: "Invalid description" });
        else
        {
            // Check that restaurant exists
            const rest = await Restaurant.findByPk(parseInt(restID));
            if ( rest === null )
                res.status(404).json({ error: "Restaurant cannot be found" });
            else
            {
                // Update the restaurants value
                await Restaurant.update({
                    description: description,
                },{
                    where: {
                        restID: parseInt(restID)
                }});

                // Return the updated restaurant
                var upd_restaurant = await Restaurant.findByPk(parseInt(restID));
                upd_restaurant.tags = ["temp_tag"]; // <---------- REMOVE ONCE TAGS HAVE BEEN ADDED
                res.status(200).json(upd_restaurant);
            }
        }
    }
    catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



// ================================================================================ GET

// GET /restaurant
// Get a list of restaurants
router.get("/", async (req, res) => {
    try {
        // Get a list of available restaurants
        const db_restaurants = await Restaurant.findAll();

        // Process data
        var rest_list = { restaurants: [] };
        for (const rest of db_restaurants)
        {
            // Add tags, then add to list
            rest.tags = ["temp_tag"]; // <---------- REMOVE ONCE TAGS HAVE BEEN ADDED
            rest_list.restaurants.push(rest);
        }
        // Return result
        res.status(200).json(rest_list);
    } catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



// GET /restaurant/<id>
// Get a specific restaurant
router.get("/:id", async (req, res) => {
    try {
        // Get restaurant id from URL
        const restID = req.params.id;

        // Get restaurant using the id
        const restaurant = await Restaurant.findByPk(parseInt(restID));
        if (restaurant == null)
            res.status(404).json({ error: "Restaurant not found" });
        else {
            restaurant.tags = ["temp_tag"]; // <---------- REMOVE ONCE TAGS HAVE BEEN ADDED
            res.status(200).json(restaurant);
        }
    }
    catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



// GET /restaurant/user/<id>
// Get restaurant owned by a user
router.get("/user/:id", async (req, res) => {
    try {
        // Get user id from URL
        const userID = req.params.id;

        // Get restaurant from user
        const restaurant = await Restaurant.findOne({ where: { userID: parseInt(userID) } });
        if (restaurant === null)
            res.status(404).json({ error: "Restaurant not found" });
        else {
            restaurant.tags = ["temp_tag"]; // <---------- REMOVE ONCE TAGS HAVE BEEN ADDED
            res.status(200).json(restaurant);
        }
    }
    catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



// ================================================================================ Other

// PATCH /restaurant/change
// Makes changes to a restaurant
router.patch("/change", async (req, res) => {
    try {
        // Retrieve and validate information from body
        const { restID, name, address, phone, desc, hours } = req.body;
        if (RestaurantLogic.validate_name(name) &&
            RestaurantLogic.validate_address(address) &&
            RestaurantLogic.validate_phone(phone) &&
            RestaurantLogic.validate_description(desc) &&
            RestaurantLogic.validate_hours(hours)
        ) {
            // Validate restID to make changes to
            const restaurant = await Restaurant.findByPk(parseInt(restID));
            if (restaurant == null)
                res.status(404).json({ error: "Restaurant cannot be found" });
            else {
                // Update values of the restaurant
                await Restaurant.update({
                    name: name,
                    address: address,
                    phone_num: phone,
                    description: desc,
                    open_hours: hours
                }, {
                    where: {
                        restID: parseInt(restID)
                    },
                },);
                var new_restaurant = await Restaurant.findByPk(parseInt(restID));
                new_restaurant.tags = ["temp_tag"]; // <---------- REMOVE ONCE TAGS HAVE BEEN ADDED
                res.status(200).json(new_restaurant);
            }
        }
        else // Non-restID item is invalid
        {
            res.status(400).json({ error: "Invalid item in request" });
        }
    }
    catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



export default router;
