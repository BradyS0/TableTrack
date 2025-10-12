// file partly created using chatGPT
import express from "express";
import { User } from "../models/User.js";
import * as UserLogic from "../logic/userLogic.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (UserLogic.validate_all(first_name, last_name, email, password)) {
        try {
            const hashed_password = UserLogic.hash_password(password);
            const user = await User.create({
                first_name,
                last_name,
                email,
                hashed_password,
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: "Invalid Parameters" });
        }
    } else {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.delete("/:userID", async (req, res) => {
    const deleted = await User.destroy({
        where: { userID: parseInt(req.params.userID) },
    });
    if (deleted) res.status(204).send();
    else res.status(404).json({ error: "User not found" });
});

router.patch("/changeName", async (req, res) => {
    const { userID, name } = req.body;
    const updated = await User.update({ name }, { where: { userID } });
    if (updated[0]) res.status(200).json({ message: "Name updated" });
    else res.status(404).json({ error: "User not found" });
});
export default router;
