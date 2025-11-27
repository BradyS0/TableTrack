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
User.create_new = async function (first_name, last_name, email, password)
{
    try{ // Attempt to create the user

        await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        });
        return await User.get_by_email(email);

    }catch{ // Failed to create the user
        throw new Error("Failed to create a new user, verify the information provided is correct.")
    }
}

// Query: Match email and password
User.login = async function (email, password)
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
User.destroy_user = async function (userID)
{
    return await User.destroy({
        where: {
            userID: userID 
    }});
}

// Query: Get user using userID
User.get_by_id = async function (id)
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
User.get_by_email = async function (email)
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
User.change_firstname = async function (id, name)
{
    return await User.update({ 
            first_name: name 
        },{ where: { 
            userID: id
    }});
}

// Query: Change user lastname
User.change_lastname = async function (id, name)
{
    return await User.update({ 
            last_name: name 
        },{ where: { 
            userID: id 
    }});
}

// Query: Change user email
User.change_email = async function (id, email)
{
    return await User.update({ 
            email: email
        },{ where: { 
            userID: id 
    }});
}

// Query: Get a users password
User.get_password = async function (id)
{
    return await User.findOne({ 
        attributes: [
            'password'
        ], where: {
            userID: id
    }});
}

// Query: Change user password
User.change_password = async function (id, pass)
{
    return await User.update({ 
            password: pass
        },{ where: { 
            userID: id 
    }});
}
