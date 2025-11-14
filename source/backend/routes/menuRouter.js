
import express from "express";
import { Restaurant, MenuItem } from "../models";
// import { MenuItem } from "../models/MenuItem.js";
import MenuLogic from "../logic/menuLogic.js";

const router = express.Router();

// ================================================================================ POST / PATCH

// POST /v1/menu/{restID}
// Creates a new item for a restaurant item
router.post("/:restID", async (req, res) => {
    const restID = req.params.restID;
    if (!isNaN(parseInt(restID))) {
        
        const restaurant = await Restaurant.findByPk(parseInt(restID));

        if (restaurant !== null) {
            const { name, price, description, category } = req.body;
            const money = MenuLogic.parse_money(price)
            if ( MenuLogic.validate_name(name) &&
                !isNaN(money) &&
                MenuLogic.validate_description(description) &&
                MenuLogic.validate_category(category)
            ) {
                // all parameters valid, creating new menu item
                const new_item = await MenuItem.create({
                    restID: restID,
                    name: name,
                    price: money,
                    description: description,
                    category: category
                });
                res.status(201).json({
                    itemID: new_item.itemID,
                    restID: new_item.restID,
                    name: new_item.name,
                    price: new_item.price,
                    description: new_item.description,
                    category: new_item.category
                });
            } else {
                res.status(400).json({ error: "Invalid parameters."})
            }
        } else {
            res.status(404).json({ error: "Restaurant was not found."})
        }
    } else{
        res.status(400).json({ error: "Invalid restaurant ID."})
    }
});

// GET /v1/menu/{restID}/
// Get entire list of menu items
router.get("/:restID", async (req, res) => {
    const restID = parseInt(req.params.restID);
    if (!isNaN(restID)) {
        const restaurant = await Restaurant.findByPk(restID)
        
        if (restaurant !== null) {
            const menuList = await MenuItem.findAll({
                attributes: ['name', 'price', 'description', 'category'],
                where: { restID: restID }
            });
            
            res.status(200).json({menu: menuList})
        } else {
            res.status(404).json({ message: "Restaurant could not be found."})
        }
    } else {
        res.status(400).json({ error: "Invalid restaurant ID."})
    }
});

// GET /v1/menu/{restID}/{itemID}
// Get a single menu item
router.get("/:restID/:itemID", async (req, res) => {
    const restID = parseInt(req.params.restID);
    const itemID = parseInt(req.params.itemID);
    if (!(isNaN(restID) || (isNaN(itemID)))) {
        const restaurant = await Restaurant.findByPk(restID)
        

        if (restaurant !== null) {
            const item = await MenuItem.findOne({
                attributes: ['name', 'price', 'description', 'category'],
                where: {
                    itemID: itemID,
                    restID: restID
                }
            });
            if (item !== null) {
                res.status(200).json({
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    category: item.category
                })
            } else {
                res.status(400).json({ error: "Invalid item in request."})
            }
        } else {
            res.status(404).json({ message: "Restaurant could not be found."})
        }
    } else {
        res.status(400).json({ error: "Invalid restaurant or item ID."})
    }
});

// PATCH /v1/menu/{restID}/change/name
// Update menu item name
router.patch("/:restID/change/name", async (req, res) => {
    const restID = parseInt(req.params.restID);
    const {itemID, name} = req.body;

    if(!(isNaN(itemID) || isNaN(restID))) {
      
        if (MenuLogic.validate_name(name)) {
            const updated = await MenuItem.update({ name: name },
                {
                    where: { 
                        itemID: itemID,
                        restID: restID
                    }
                }
            );
            
            if (updated[0]) {
                //menu item exists
                res.status(200).json({ message: "Name updated."})
            } else {
                res.status(404).json({ error: "Menu item not found."})
            }
        } else {
            res.status(400).json({ error: "Invalid menu item name."})
        }
    } else {
        res.status(400).json({ error: "Invalid restaurant or item ID."})
    }
});

// PATCH /v1/menu/{restID}/change/price
// Update menu item name
router.patch("/:restID/change/price", async (req, res) => {
    const restID = parseInt(req.params.restID);
    const {itemID, price} = req.body;

    if (!(isNaN(itemID) || isNaN(restID))) {
        const money = MenuLogic.parse_money(price)
        if (!isNaN(money)) {
            const updated = await MenuItem.update({ price: money },
                {
                    where: { 
                        itemID: itemID,
                        restID: restID
                    }
                }
            );
            
            if (updated[0]) {
                //menu item exists
                res.status(200).json({ message: "Price updated."})
            } else {
                res.status(404).json({ error: "Menu item not found."})
            }
        } else {
            res.status(400).json({ error: "Invalid menu item name."})
        }
    } else {
        res.status(400).json({ error: "Invalid restaurant or item ID."})
    }
});

// PATCH /v1/menu/{restID}/change/description
// Update menu item name
router.patch("/:restID/change/description", async (req, res) => {
    const restID = parseInt(req.params.restID);
    const {itemID, description} = req.body;

    if(!(isNaN(itemID) || isNaN(restID))) {

        if (MenuLogic.validate_description(description)) {
            const updated = await MenuItem.update({ description: description },
                {
                    where: { 
                        itemID: itemID,
                        restID: restID
                    }
                }
            );
            
            if (updated[0]) {
                //menu item exists
                res.status(200).json({ message: "description updated."})
            } else {
                res.status(404).json({ error: "Menu item not found."})
            }
        } else {
            res.status(400).json({ error: "Invalid menu item name."})
        }
    } else {
        res.status(400).json({ error: "Invalid restaurant or item ID."})
    }
});

// PATCH /v1/menu/{restID}/change/category
// Update menu item name
router.patch("/:restID/change/category", async (req, res) => {
    const restID = parseInt(req.params.restID);
    const {itemID, category} = req.body;

    if(!(isNaN(itemID) || isNaN(restID))) {

        if (MenuLogic.validate_category(category)) {
            const updated = await MenuItem.update({ category: category },
                {
                    where: { 
                        itemID: itemID,
                        restID: restID
                    }
                }
            );
            
            if (updated[0]) {
                //menu item exists
                res.status(200).json({ message: "Category updated."})
            } else {
                res.status(404).json({ error: "Menu item not found."})
            }
        } else {
            res.status(400).json({ error: "Invalid menu item name."})
        }
    } else {
        res.status(400).json({ error: "Invalid restaurant or item ID."})
    }
});

// DELETE /v1/menu/{restID}/{itemID}
// Delete menu item
router.delete("/:restID/:itemID", async (req, res) => {
    const restID = parseInt(req.params.restID);
    const itemID = parseInt(req.params.itemID);

    if (!(isNaN(restID) || isNaN(itemID))) {

        const deleted = await MenuItem.destroy({
            where: {
                itemID: itemID,
                restID: restID
            }
        });
        if (deleted)
            res.status(204).send({ message: "Menu item successfully deleted."});
        else
            res.status(404).json({ error: "Menu item was not found."})
    } else {
        res.status(400).json({ error: "Invalid restaurant or item ID."})
    }
});

export default router;