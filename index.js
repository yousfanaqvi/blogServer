const express = require("express");
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport=require('passport');
const path = require("path");
const cors = require("cors");
const app = express();
require('dotenv').config();
const bodyParser=require("body-parser");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'https://blog-6uviut0if-yousfanaqvi.vercel.app',
}));

app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie : { httpOnly: true, secure : false}
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
const user = require("./api/user");
app.use("/", user);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
