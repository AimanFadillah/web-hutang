const express = require("express");
const cookieParser = require("cookie-parser");
const Route = require("./route.js");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./Database/config.js");
const dotenv = require("dotenv");
const pg = require("pg");
const pgHstore = require("pg-hstore");
const geoip = require('geoip-lite');

const app = express();

db.sync();

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(__dirname + "/Public"));
app.use(Route);

app.get("*", (req, res) => res.sendFile(__dirname + "/index.html"))

app.listen(process.env.APP_PORT, () => console.log(`Server On in http://localhost:${process.env.APP_PORT}/`));