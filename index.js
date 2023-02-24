require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport=require('passport');
const path = require("path");
const cors = require("cors");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*", // allow to server to accept request from different origin
  methods: ['GET','POST','DELETE'],
  credentials: true, // allow session cookie from browser to pass through
  "Access-Control-Allow-Credentials": true

}));

app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
  cookie : { httpOnly: true, secure : false}
}))
app.use(passport.initialize());
app.use(passport.session());

// app.use(cors({
//   origin:'https://shoppingcart-beta.vercel.app',
// }));
app.use(bodyParser.urlencoded({ extended: true }));

// const customer = require("./api/customer");

app.use(express.json({ extended: false }));

// app.use("/", customer);

// const PORT = process.env.PORT || 8080;
const user = require("./api/user");
app.use("/", user);

// app.use(express.static(path.join(__dirname, "./frontend/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./frontend/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
