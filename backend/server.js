const { app } = require("./Config/app");
const { usersRouter } = require("./controllers/users.controllers");
const { booksRouter } = require("./controllers/books.controllers");

app.get("/", (req, res) => res.send("server running!"));



app.use("/api/auth", usersRouter);
app.use("/api/books", booksRouter);
