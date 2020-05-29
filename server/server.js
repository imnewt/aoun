var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var books = require("./routes/books");
var orders = require("./routes/orders");
var users = require("./routes/users");

var app = express();
var port = 3000;

app.listen(port, function(){
    console.log(`Server running in port ${port}`)
})

//views
app.set("views",  path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

//Routes
app.use("/", index);
app.use("/api", books);
app.use("/api", orders);
app.use("/api", users);