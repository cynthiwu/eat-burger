// Setting up dependencies //

const express = require("express");

const PORT = process.env.PORT || 3030;

const app = express();

// Middleware to serve static content from the public director and parse request body as JSON //
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Setting up Handlebars //
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Importing routes and giving access to server //
const router = require("./controllers/burgers_controller.js");

app.use(router);

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});
