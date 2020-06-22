const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");  

const app = express();

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// ROUTES
app.use("/", require("./Routes/index"));
app.use("/users", require("./Routes/user"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
// https://youtu.be/6FOq4cUdH8k?list=LLB3AQLFERVUvgJfbCz5mNww&t=1319