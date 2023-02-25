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
// app.get('/', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // allow requests from all domains
//   res.send('Hello, world!');
// });
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });
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


app.use("/", user, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow requests from all domains
});
// app.get('/example', (req, res) => {
//   // Set the Access-Control-Allow-Origin header to allow all domains to access the resource
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.send('This is an example response');
// });


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
