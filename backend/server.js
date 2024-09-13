const express = require('express');
const app = express();
const { User } = require("./db/mongo");
const cors = require("cors");

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
    console.log("userInDb:", userInDb);
    if (userInDb != null) {
        res.status(400).send("email already exists");
        return;
    };
    const user = {
        email: email,
        password: password
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
    console.log('body:', body);
    console.log("users  in db:", users);

const userInDb =  await User.findOne({
    email: body.email
});
if (userInDb === null) {
    res.status(400).send("wrong email");
    return;
}
const passwordInDb = userInDb.password;
if (passwordInDb != body.password) {
    res.status(400).send("wrong password");
    return;
}
    res.send({
        userId: userInDb._id,
        token: "token"
    });
}