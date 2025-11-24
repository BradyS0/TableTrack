import express from "express";
import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";
import MenuLogic from "../logic/menuLogic.js";

const router = express.Router();

// ================================================================================ POST / PATCH

// POST /v1/menu/{restID}
// Creates a new item for a restaurant item
router.post("/:restID", async (req, res) => {
  const restID = parseInt(req.params.restID);

  if (isNaN(restID))
    return res.status(400).json({ error: "Invalid restaurant ID." });

  const restaurant = await Restaurant.get_by_id(restID);
  if (!restaurant)
    return res.status(404).json({ error: "Restaurant was not found." });

  // Validate menu item fields
  const { name, price, description, category } = req.body;
  const money = MenuLogic.parse_money(price);

  const valid =
    MenuLogic.validate_name(name) &&
    !isNaN(money) &&
    MenuLogic.validate_description(description) &&
    MenuLogic.validate_category(category);

  if (!valid) return res.status(400).json({ error: "Invalid parameters." });

  // Create new menu item
  const new_item = await MenuItem.create_new(restID, name, money, description, category);

  return res.status(201).json(new_item);
});

// GET /v1/menu/{restID}/
// Get entire list of menu items
router.get("/:restID", async (req, res) => {
  const restID = parseInt(req.params.restID);
  if (isNaN(restID))
    return res.status(400).json({ error: "Invalid restaurant ID." });

  // Check restaurant exists
  const restaurant = await Restaurant.get_by_id(restID);
  if (!restaurant)
    return res.status(404).json({ message: "Restaurant could not be found." });

  // Fetch menu list
  const menuList = await MenuItem.get_by_restaurant(restID);

  return res.status(200).json({ menu: menuList });
});

// GET /v1/menu/{restID}/{itemID}
// Get a single menu item
router.get("/:restID/:itemID", async (req, res) => {
  const restID = parseInt(req.params.restID);
  const itemID = parseInt(req.params.itemID);

  // Validate IDs
  if (isNaN(restID) || isNaN(itemID))
    return res.status(400).json({ error: "Invalid restaurant or item ID." });

  // Check restaurant exists
  const restaurant = await Restaurant.get_by_id(restID);
  if (!restaurant)
    return res.status(404).json({ message: "Restaurant could not be found." });

  // Fetch item
  const item = await MenuItem.get_by_id(restID, itemID);
  if (!item) return res.status(400).json({ error: "Invalid item in request." });

  // Success
  return res.status(200).json(item);
});

// PATCH /v1/menu/{restID}/change/name
// Update menu item name
router.patch("/:restID/change/name", async (req, res) => {
  const restID = parseInt(req.params.restID);
  const itemID = parseInt(req.body.itemID);
  const { name } = req.body;

  if (isNaN(restID) || isNaN(itemID))
    return res.status(400).json({ error: "Invalid restaurant or item ID." });

  if (!MenuLogic.validate_name(name))
    return res.status(400).json({ error: "Invalid menu item name." });

  // Attempt update
  const updated = await MenuItem.change_name(restID, itemID, name);

  if (!updated[0])
    return res.status(404).json({ error: "Menu item not found." });

  // Success
  return res.status(200).json({ message: "Name updated." });
});

// PATCH /v1/menu/{restID}/change/price
// Update menu item price
router.patch("/:restID/change/price", async (req, res) => {
  const restID = parseInt(req.params.restID);
  const itemID = parseInt(req.body.itemID);
  const { price } = req.body;

  // Validate IDs
  if (isNaN(restID) || isNaN(itemID))
    return res.status(400).json({ error: "Invalid restaurant or item ID." });

  // Parse and validate price
  const money = MenuLogic.parse_money(price);
  if (isNaN(money))
    return res.status(400).json({ error: "Invalid price value." });

  // Attempt update
  const updated = await MenuItem.change_price(restID, itemID, price);

  if (!updated[0])
    return res.status(404).json({ error: "Menu item not found." });

  // Success
  return res.status(200).json({ message: "Price updated." });
});

// PATCH /v1/menu/{restID}/change/description
// Update menu item description
router.patch("/:restID/change/description", async (req, res) => {
  const restID = parseInt(req.params.restID);
  const itemID = parseInt(req.body.itemID);
  const { description } = req.body;

  if (isNaN(restID) || isNaN(itemID))
    return res.status(400).json({ error: "Invalid restaurant or item ID." });

  if (!MenuLogic.validate_description(description))
    return res.status(400).json({ error: "Invalid description." });

  // Attempt update
  const updated = await MenuItem.change_description(restID, itemID, description);

  if (!updated[0])
    return res.status(404).json({ error: "Menu item not found." });

  // Success
  return res.status(200).json({ message: "Description updated." });
});

// PATCH /v1/menu/{restID}/change/category
// Update menu item category
router.patch("/:restID/change/category", async (req, res) => {
  const restID = parseInt(req.params.restID);
  const itemID = parseInt(req.body.itemID);
  const { category } = req.body;

  if (isNaN(restID) || isNaN(itemID))
    return res.status(400).json({ error: "Invalid restaurant or item ID." });

  if (!MenuLogic.validate_category(category))
    return res.status(400).json({ error: "Invalid category." });

  // Attempt update
  const updated = await MenuItem.change_category(restID, itemID, category);

  if (!updated[0])
    return res.status(404).json({ error: "Menu item not found." });

  // Success
  return res.status(200).json({ message: "Category updated." });
});

// DELETE /v1/menu/{restID}/{itemID}
// Delete menu item
router.delete("/:restID/:itemID", async (req, res) => {
  const restID = parseInt(req.params.restID);
  const itemID = parseInt(req.params.itemID);

  if (isNaN(restID) || isNaN(itemID))
    return res.status(400).json({ error: "Invalid restaurant or item ID." });

  // Attempt delete
  const deleted = await MenuItem.destroy(restID, itemID);

  if (!deleted)
    return res.status(404).json({ error: "Menu item was not found." });

  // Success
  return res.status(204).json({ message: "Menu item successfully deleted." });
});

export default router;
