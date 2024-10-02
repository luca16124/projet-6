const express = require("express");
const cors = require("cors");
const app = express();
const { mongoose } = require("../db/mongo");

const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use("/" + process.env.IMAGES_FOLDER_PATH, express.static("uploads"));

app.listen(PORT, function(){
    console.log(`server is running on : ${PORT}`);
});

module.exports = { app };