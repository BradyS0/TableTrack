// file partly created using chatGPT
import express from "express";
import { User } from "../models/User.js";
import * as UserLogic from "../logic/userLogic.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const email_list = await User.findAll({
            where: {
                email: email
            }
        });
    
    const valid_params = UserLogic.validate_all(first_name, last_name, email, password);

    if ((email_list === undefined || email_list.length == 0 ) && valid_params) {
        try {
            const hashed_password = UserLogic.hash_password(password);
            const user = await User.create({
                first_name : first_name,
                last_name : last_name,
                email : email,
                password : hashed_password
            });
            res.status(201).json({
                first_name: user.first_name, 
                last_name: user.last_name, 
                email: user.email});
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    } else if (!valid_params) {
        res.status(400).json({ error: "Invalid parameters" });
    } else {
        res.status(409).json({ error: "Email is already being used"});
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findAll({
            attributes: ['password'],
            where: {
                email: email
            }
        });
    const password_input = UserLogic.hash_password(password)
    if(user !== undefined && user.length == 1  && password_input == user.password) {
        res.status(200).json({message: "Login successful!"});
    } else {
        res.status(401).json({error: "Invalid email or password"});
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

router.patch("/change/firstname", async (req, res) => {
    const { userID, first_name} = req.body;

    if (UserLogic.validate_name(first_name)) {
        const updated = await User.update({ first_name : first_name }, 
        { 
            where: { 
                userID: userID 
            } 
        });

        if (updated[0]) {
            //user exists
            res.status(200).json({ message: "First name updated" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } else {
        res.status(400).json({ error: "Invalid first name"})
    }
});

router.patch("/change/lastname", async (req, res) => {
    const { userID, last_name} = req.body;

    if (UserLogic.validate_name(last_name)) {
        const updated = await User.update({ last_name : last_name }, 
        { 
            where: { 
                userID: userID 
            } 
        });

        if (updated[0]) {
            //user exists
            res.status(200).json({ message: "Last name updated" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } else {
        res.status(400).json({ error: "Invalid last name"})
    }
});

router.patch("/change/email", async (req, res) => {
    const { userID, email } = req.body;
    if (UserLogic.validate_email(email)) {
        const emailList = await User.findAll({
            where: {
                email: email
            }
        });

        if (emailList === undefined || emailList.length == 0) {
            //email is not a duplicate
            const updated = await User.update({ email : email }, { where: { userID }});
            if (updated[0]) {
                res.status(200).json({ message: "Email updated" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } else {
            //email is a duplicate (already in database)
            res.status(409).json({ error: "Email is already being used"})
        }
    } else {
        //invalid email
        res.status(400).json({ error: "Invalid email"})
    }
});

router.patch("/change/password", async (req, res) => {
    const { userID, old_password, new_password } = req.body;
    try {
        //account password stored in database
        const db_password = await User.findAll({
            attributes: ['password'],
            where: {
                userID: userID
            }
        });

        const old_hashed = UserLogic.hash_password(old_password);
        
        if (!UserLogic.validate_password(old_password)) {
            res.status(400).json({ message: "Old password is invalid"});
        } else if (db_password !== old_hashed) {
            res.status(401).json({ message: "Passwords do not match"});
        } else if (!UserLogic.validate_password(new_password)) {
            res.status(400).json({ message: "New password is invalid"});     
        } else {
            const new_hashed = UserLogic.hash_password(new_password);
            await User.update({ password: new_hashed }, { where: { userID }});

            //already checked if user exists
            res.status(200).json({ message: "Password updated" });
        }
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});
export default router;
