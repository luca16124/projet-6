const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

async function signUp(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const userInDb = await User.findOne({
        email: email
    });
    if (userInDb != null) {
        res.status(400).send("email already exists");
        return;
    };
    const user = {
        email: email,
        password: cachePassword(password)
    };
    try{
        await User.create(user);
    } catch (e) {
        console.error(e);
        res.status(500).send("something went wrong");
        return;
    }

    res.send("sign up");
}

async function login(req, res){
    const email = req.body.email;
    const body = req.body;

const userInDb =  await User.findOne({
    email: body.email
});
if (userInDb === null) {
    res.status(400).send("wrong email");
    return;
}
const passwordInDb = userInDb.password;
if (!isPasswordCorrect(req.body.password, passwordInDb)) {
    res.status(401).send("wrong password");
    return;
}
    res.send({
        userId: userInDb._id,
        token: generateToken(userInDb._id)
    });
}

function generateToken(idInDb) {
    const payload = {
        userId: idInDb
    };
    const token = jsonwebtoken.sign(payload, "CHAT", {
        expiresIn: "1d"
    });
    return token;
}


function cachePassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash; 
}

function isPasswordCorrect(password, hash) {
    const isOk = bcrypt.compareSync(password, hash);
    console.log("isOk:", isOk);
    return isOk;
}

const usersRouter = express.Router();

usersRouter.post("/signup", signUp);
usersRouter.post("/login", login);

module.exports = { usersRouter };
