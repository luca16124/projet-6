const mongoose = require('mongoose');

const PASSWORD = "bIhgxtHIC2K3l5fO";
const USER = "luca";
const DB_URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.j7egl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log("DB_URL:", DB_URL);


async function connect() {
    try{
        await mongoose.connect(DB_URL);
        console.log("connected to DB");
    } catch (e) {
        console.error(e);
    }
}
connect();

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("user", UserSchema);


module.exports = { User };
