const path = require("path");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "static")));

const session = require("express-session");
app.use(session({
	secret:"herropreash",
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))

const flash = require("express-flash");
app.use(flash());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/quoting_dojo", { useNewUrlParser: true});

var UserSchema = new mongoose.Schema({
	name: { type: String, required: true,  minlength:6 },
	quote: { type: String, required: true,  minlength: 6 },
}, {timestamps: true });
mongoose.model("User", UserSchema);
var User = mongoose.model("User")

require('./server/config/routes.js')(app);