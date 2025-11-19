// file partly created using chatGPT
import express from "express";
import { User } from "../models/User.js";
import UserLogic from "../logic/userLogic.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const email_list = await User.findOne({
        where: { email: email }
    });

    const valid_params = UserLogic.validate_name(first_name) && UserLogic.validate_name(last_name)
        && UserLogic.validate_email(email) && UserLogic.validate_password(password);

    if (email_list || !valid_params)
        return res.status(400).json({ error: "Invalid parameters" });

    try {
        const hashed_password = UserLogic.hash_password(password);
        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashed_password
        });
        res.status(201).json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        attributes: ['userID', 'first_name', 'last_name', 'email'],
        where: {
            email: email,
            password: UserLogic.hash_password(password)
        }
    });

    if (!user)
        return res.status(401).json({ error: "Invalid email or password" });

    return res.status(200).json({
        user,
        message: "Login successful!"
    });
});

router.delete("/:userID", async (req, res) => {
    const deleted = await User.destroy({
        where: { userID: parseInt(req.params.userID) },
    });
    if (deleted) res.status(204).send();
    else res.status(404).json({ error: "User not found" });
});

router.patch("/change/firstname", async (req, res) => {
    const { userID, first_name } = req.body;

    if (!UserLogic.validate_name(first_name))
        return res.status(400).json({ error: "Invalid first name" })

    const updated = await User.update({ first_name: first_name },
        {
            where: { userID: userID }
        });

    if (updated[0]) {
        //user exists
        res.status(200).json({ message: "First name updated" });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

router.patch("/change/lastname", async (req, res) => {
    const { userID, last_name } = req.body;

    if (!UserLogic.validate_name(last_name))
        return res.status(400).json({ error: "Invalid last name" })

    const updated = await User.update({ last_name: last_name },
        {
            where: { userID: userID }
        });

    if (updated[0]) {
        //user exists
        res.status(200).json({ message: "Last name updated" });
    } else {
        res.status(404).json({ error: "User not found" });
    }

});

router.patch("/change/email", async (req, res) => {
    const { userID, email } = req.body;
    if (!UserLogic.validate_email(email))
        return res.status(400).json({ error: "Invalid email syntax" });

    const emailList = await User.findOne({ where: { email: email } });

    if (emailList)
        return res.status(400).json({ error: "Invalid parameter" });

    //email is not a duplicate
    const updated = await User.update({ email: email }, { where: { userID:userID } });
    if (updated[0]) {
        res.status(200).json({ message: "Email updated" });
    } else {
        res.status(404).json({ error: "User not found" });
    }

});

router.patch("/change/password", async (req, res) => {
    const { userID, old_password, new_password } = req.body;
    try {
        //account password stored in database
        const user = await User.findAll({
            attributes: ['password'],
            where: {
                userID: userID
            }
        });

        const old_hashed = UserLogic.hash_password(old_password);

        if (!UserLogic.validate_password(old_password)) {
            res.status(400).json({ message: "Old password is invalid" });
        } else if (user[0].password !== old_hashed) {
            res.status(401).json({ message: "Passwords do not match" });
        } else if (!UserLogic.validate_password(new_password)) {
            res.status(400).json({ message: "New password is invalid" });
        } else {
            const new_hashed = UserLogic.hash_password(new_password);
            await User.update({ password: new_hashed }, { where: { userID } });

            //already checked if user exists
            res.status(200).json({ message: "Password updated" });
        }
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});
export default router;