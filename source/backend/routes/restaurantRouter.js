
import express from "express";
import { User }       from "../models/User.js";
import { Restaurant } from "../models/Restaurant.js";
import * as RestaurantLogic from "../logic/restaurantLogic.js";

const router = express.Router();



// POST /restaurant
// Create a new restaurant
router.post("/", async (req, res) => {
    try 
    {
        // Retrieve and validate information from body
        const { userID, name, address, phone, desc, hours } = req.body;
        if ( RestaurantLogic.validate_name(name) &&
             RestaurantLogic.validate_address(address) &&
             RestaurantLogic.validate_phone(phone) &&
             RestaurantLogic.validate_description(desc) &&
             RestaurantLogic.validate_hours(hours)
        ){
            // Validate ownerID for new restaurant exists
            const users = await User.findAll({ where: { userID: parseInt(userID) } });
            if (users === undefined || users.length == 0)
            {
                res.status(404).json({ error: "User cannot be found" });
            }
            else
            {
                // Check if this user already owns a restaurant
                const restaurants = await Restaurant.findAll({ where: { userID: parseInt(userID) } })
                if (restaurants === undefined || restaurants.length == 0)
                {
                    // Create the new restaurant
                    const restaurant = await Restaurant.create({
                        userID:      userID,
                        name:        name,
                        address:     address,
                        phone_num:   phone,
                        description: desc,
                        open_hours:  hours,
                        logo:        ""
                    });
                    res.status(201).json(restaurant);
                }
                else
                {
                    res.status(409).json({ error: "User already has a restaurant" });
                }
            }   
        } 
        else // Non-ownerID item is invalid
        {
            res.status(400).json({ error: "Invalid item in request" });
        }
    }
    catch (err)
    {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



// GET /restaurant
// Get a list of restaurants
router.get("/", async (req, res) => {
    try
    {
        // Get a list of available restaurants
        const db_restaurants = Restaurant.findAll();

        // Process data
        var formatted_json = {restaurants: []};
        for (var rest in db_restaurants)
        {
            // Add needed values to restaurant json
            var rest_json = {};
            rest_json.id          = rest.restID;
            rest_json.name        = rest.name;
            rest_json.address     = rest.address;
            rest_json.phone_num   = rest.phone_num;
            rest_json.description = rest.description;
            rest_json.tags        = ["temp_tag"]; // <-------------------------------------------------- REMOVE ONCE TAGS HAVE BEEN ADDED

            // Add this object to the formatted json
            formatted_json.restaurants.push(rest_json);
        }
        res.status(200).json(formatted_json);
    }
    catch (err)
    {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



// GET /restaurant/{id}
// Get a specific restaurant
router.get("/:id", async (req, res) => {
    try
    {
        // Get restaurant id from URL
        const restID = req.params.id;

        // Get restaurant using the id
        const restaurant = await Restaurant.findByPk(parseInt(restID));
        if (restaurant == null)
            res.status(404).json({ error: "Restaurant not found" });
        else
            restaurant.tags = ["temp_tag"]; // <-------------------------------------------------- REMOVE ONCE TAGS HAVE BEEN ADDED
            res.status(200).json(restaurant);
    }
    catch (err)
    {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



// PATCH /restaurant/change
// Makes changes to a restaurant
router.patch("/change", async (req, res) => {
    try
    {
        // Retrieve and validate information from body
        const { restID, name, address, phone, desc, hours } = req.body;
        if ( RestaurantLogic.validate_name(name) &&
             RestaurantLogic.validate_address(address) &&
             RestaurantLogic.validate_phone(phone) &&
             RestaurantLogic.validate_description(desc) &&
             RestaurantLogic.validate_hours(hours)
        ){
            // Validate restID to make changes to
            const restaurant = await Restaurant.findByPk(parseInt(restID));
            if (restaurant == null)
                res.status(404).json({ error: "Restaurant cannot be found" });
            else
            {
                // Update values of the restaurant
                await Restaurant.update({
                    name: name,
                    address: address,
                    phone_num: phone,
                    description: desc,
                    open_hours: hours
                },{ where: {
                    restID: parseInt(restID)
                },},);
                var new_restaurant = await Restaurant.findByPk(parseInt(restID));
                new_restaurant.tags = ["temp_tag"]; // <-------------------------------------------------- REMOVE ONCE TAGS HAVE BEEN ADDED
                res.status(200).json(new_restaurant);
            }
        }
        else // Non-restID item is invalid
        {
            res.status(400).json({ error: "Invalid item in request" });
        }
    }
    catch (err)
    {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});



export default router;
