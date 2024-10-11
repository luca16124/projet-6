require("dotenv").config();
const { app } = require("./Config/app");
const { usersRouter } = require("./controllers/users.controllers");
const { booksRouter } = require("./controllers/books.controllers");
const { mongo } = require("./db/mongo");

const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("server running!"));



app.use("/api/auth", usersRouter);
app.use("/api/books", booksRouter);

app.listen(PORT, function(){
    console.log(`server is running on : ${PORT}`);
});
