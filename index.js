const express = require("express");
require('dotenv').config();

const app = express();
const customer = require("./api/customer");
const stripe= require("stripe")(process.env.stripkey);

app.use(express.json({ extended: false }));

app.use("/", customer);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
