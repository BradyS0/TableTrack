
import express from "express";
import { User } from "../models/User.js";
import { Restaurant } from "../models/Restaurant.js";
import RestaurantLogic from "../logic/restaurantLogic.js";

const router = express.Router();

// ================================================================================ POST / PATCH

// POST /restaurant
// Create a new restaurant
router.post("/", async (req, res) => {
    try {
        // Retrieve and validate information from body
        const { userID, name, address, phone, tags } = req.body;
        if (!RestaurantLogic.validate_name(name))
            return res.status(400).json({ error: "Invalid name" });

        if (!RestaurantLogic.validate_address(address))
            return res.status(400).json({ error: "Invalid address" });

        if (!RestaurantLogic.validate_phone(phone))
            return res.status(400).json({ error: "Invalid phone" })

        if (tags && !RestaurantLogic.validate_tags(tags))
            return res.status(400).json({ error: "invalid syntax for tags only aplphabets allowed" })

        // Check that owner of restaurant exists
        const user = await User.findByPk(parseInt(userID));
        if (user === null)
            return res.status(404).json({ error: "User cannot be found" });

        // Check that owner doesnt already have a restaurant
        const prev_restaurant = await Restaurant.findOne({ where: { userID: parseInt(userID) } });
        if (prev_restaurant !== null)
            return res.status(409).json({ error: "User already has restaurant" });

        // Create the new restaurant
        let new_restaurant = await Restaurant.create({
            userID: userID,
            name: name,
            address: address,
            phone: phone,
            tags: tags,
            description: "",
            open_hours: "",
            logo: ""
        });
        res.status(201).json(new_restaurant);

    } catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});


// PATCH /restaurant/name
// Edit name of a restaurant
router.patch("/change/name", async (req, res) => {
    try {
        // Retrieve and validate information from body
        const { restID, name, } = req.body;
        const rest = await Restaurant.findByPk(parseInt(restID));

        if (!rest)
            return res.status(404).json({ error: "restaurant not found!" })

        if (rest.name === name)
            return res.status(400).json({ error: `${name} is already the name of this restaurant` })

        if (!RestaurantLogic.validate_name(name))
            return res.status(400).json({ error: "Invalid name" });

        await rest.update({ name })
        return res.status(201).json({ message: "Restaurant name updated" })
    }
    catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});

// PATCH /restaurant/address
// Edit address of a restaurant
router.patch("/change/address", async (req, res) => {
    try {
        // Retrieve and validate information from body
        const { restID, address, } = req.body;
        const duplicateRest = await Restaurant.findOne({ where: { address: address } })

        if (duplicateRest)
            return res.status(400).json({ error: "Restaurant address in use" })

        const rest = await Restaurant.findByPk(parseInt(restID));

        if (!rest)
            return res.status(404).json({ error: "restaurant not found!" })

        if (!RestaurantLogic.validate_address(address))
            return res.status(400).json({ error: "Invalid address or address format" });

        await rest.update({ address })
        return res.status(201).json({ message: "Restaurant address updated" })
    }
    catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});

// PATCH /restaurant/phone
// Edit address of a restaurant
router.patch("/change/phone", async (req, res) => {
    try {
        // Retrieve and validate information from body
        const { restID, phone, } = req.body;
        const duplicateRest = await Restaurant.findOne({ where: { phone: phone } })

        if (duplicateRest)
            return res.status(400).json({ error: "Restaurant phone number already in use" })

        const rest = await Restaurant.findByPk(parseInt(restID));

        if (!rest)
            return res.status(404).json({ error: "restaurant not found!" })

        if (!RestaurantLogic.validate_phone(phone))
            return res.status(400).json({ error: "Invalid phone number" });

        await rest.update({ phone: phone })
        return res.status(201).json({ message: "Restaurant phone number updated" })
    }
    catch (err) {
        // Unexpected internal error occured
        res.status(500).json({ error: err.message });
    }
});

// PATCH /restaurant/description
// Edit description of a restaurant
router.patch("/change/description", async (req, res) => {
    try {
        // Retrieve and validate information from body
        const { restID, description, } = req.body;

        if (!RestaurantLogic.validate_description(description))
            return res.status(400).json({ error: "Invalid description" });

        // Check that restaurant exists
        const rest = await Restaurant.findByPk(parseInt(restID));
        if (rest === null)
            return res.status(404).json({ error: "Restaurant cannot be found" });

        // Update the restaurants value
        await rest.update({ description: description });

        return res.status(200).json(rest);
    }
    catch (err) {
        // Unexpected internal error occured
        return res.status(500).json({ error: err.message });
    }
});

// PATCH /restaurant/tags
// Edit tags of a restaurant
router.patch("/change/tags", async (req, res) => {
    try {
        // Retrieve and validate information from body
        const { restID, tags, } = req.body;
        if (!Array.isArray(tags))
            return res.status(406).json({ error: `Tags are expected as Arrays of strings but ${Object.prototype.toString.call(tags)} provided` });

        if (!RestaurantLogic.validate_tags(tags))
            return res.status(400).json({ error: 'invalid syntax, only alphabets and hyphen accepted between 3-30 characters long' })

        // Check that restaurant exists
        const rest = await Restaurant.findByPk(parseInt(restID));
        if (!rest)
            return res.status(404).json({ error: "Restaurant cannot be found" });


        // Update the restaurants value
        let input = tags.length === 0 || !tags ? [] : tags
        await rest.update({ tags: input })

        //return the updated restaurant
        return res.status(200).json(rest);

    } catch (err) {
        // Unexpected internal error occured
        return res.status(500).json({ error: err.message });
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
        let rest_list = { restaurants: [] };
        for (const rest of db_restaurants) {
            rest_list.restaurants.push(rest);
        }

        return res.status(200).json(rest_list);
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
            return res.status(404).json({ error: "Restaurant not found" });

        return res.status(200).json(restaurant);
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
            return res.status(404).json({ error: "Restaurant not found" });

        return res.status(200).json(restaurant);
    } catch (err) {
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
        const { restID, name, address, phone, desc } = req.body;
        if (!RestaurantLogic.validate_name(name) ||
            !RestaurantLogic.validate_address(address) ||
            !RestaurantLogic.validate_phone(phone) ||
            !RestaurantLogic.validate_description(desc))
            return res.status(400).json({ error: "Invalid item in request" });

        // Validate restID to make changes to
        const restaurant = await Restaurant.findByPk(parseInt(restID));
        if (restaurant == null)
            return res.status(404).json({ error: "Restaurant cannot be found" });

        // Update values of the restaurant
        await restaurant.update({
            name, address, phone,
            description: desc,
        })

        return res.status(200).json(restaurant);
    }
    catch (err) {
        // Unexpected internal error occured
        return res.status(500).json({ error: err.message });
    }
});



export default router;
