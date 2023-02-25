const express = require("express");
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport=require('passport');
const path = require("path");
const cors = require("cors");
const app = express();
require('dotenv').config();
const bodyParser=require("body-parser");
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'https://blog-gayl03f5r-yousfanaqvi.vercel.app',
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
const user = require("./api/user");
app.use(express.json({ extended: false }));


app.use("/", user);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
