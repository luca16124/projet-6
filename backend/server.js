const express = require('express');
const app = express();
const { User } = require("./db/mongo");
const cors = require("cors");
const bcrypt = require("bcrypt");

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post("/api/auth/signup", signUp);
app.post("/api/auth/login", login)

app.listen(PORT, function(){
    console.log(`server is running on : ${PORT}`);
});


async function signUp(req, res){
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
        token: "token"
    });
}


function cachePassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log("hash:", hash);
    return hash; 
}

function isPasswordCorrect(password, hash) {
    const isOk = bcrypt.compareSync(password, hash);
    console.log("isOk:", isOk);
    return isOk;
}