const express = require("express");
const app = express();
const customer = require("./api/customer");
const stripe= require("stripe")(process.env.stripkey);
require('dotenv').config();

app.use(express.json({ extended: false }));

app.use("/", customer);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
