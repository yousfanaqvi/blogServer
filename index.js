const express = require("express");
const cors = require("cors");
const bodyParser=require("body-parser");
require('dotenv').config();

const app = express();
app.use(cors({
    origin:'https://shoppingcart-beta.vercel.app',
}));
app.use(bodyParser.urlencoded({ extended: true }));

const customer = require("./api/customer");

app.use(express.json({ extended: false }));

app.use("/", customer);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
