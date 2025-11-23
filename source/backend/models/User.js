//partly made using chatGPT
import { DataTypes } from "sequelize";
import sequelize from "../db.js"; // updated import

export const User = sequelize.define("User", {
    userID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
});

// Query: Create a new user
async function create(first_name, last_name, email, password)
{
    try{ // Attempt to create the user

        await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        });
        return await get_by_email(email);

    }catch{ // Failed to create the user

        throw new Error("Failed to create a new user, verify the information provided is correct.")
    }
}

// Query: Match email and password
async function login(email, password)
{
    return await User.findOne({
        attributes: [
            'userID',
            'first_name',
            'last_name',
            'email'
        ], where: {
            email: email,
            password: password
    }});
}

// Query: Delete a user
async function destroy(userID)
{
    return await User.destroy({
        where: {
            userID: userID 
    }});
}

// Query: Get user using userID
async function get_by_id(id)
{
    return await User.findOne({ 
        attributes: [
            'userID',
            'first_name',
            'last_name',
            'email'
        ], where: {
            userID: id,
    }});
}

// Query: Get user using email
async function get_by_email(email)
{
    return await User.findOne({ 
        attributes: [
            'userID',
            'first_name',
            'last_name',
            'email'
        ], where: {
            email: email,
    }});
}

// Query: Change user firstname
async function change_firstname(id, name)
{
    return await User.update({ 
            first_name: name 
        },{ where: { 
            userID: id
    }});
}

// Query: Change user lastname
async function change_lastname(id, name)
{
    return await User.update({ 
            last_name: name 
        },{ where: { 
            userID: id 
    }});
}

// Query: Change user email
async function change_email(id, email)
{
    return await User.update({ 
            email: email
        },{ where: { 
            userID: id 
    }});
}

// Query: Get a users password
async function get_password(id)
{
    return await User.findOne({ 
        attributes: [
            'password'
        ], where: {
            userID: id
    }});
}

// Query: Change user password
async function change_password(id, pass)
{
    return await User.update({ 
            password: pass
        },{ where: { 
            userID: id 
    }});
}

export default
{
    create,
    login,
    destroy,
    get_by_id,
    get_by_email,
    change_firstname,
    change_lastname,
    change_email,
    get_password,
    change_password
}
