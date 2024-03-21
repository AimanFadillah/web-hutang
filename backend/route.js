const express = require("express");
const HutangController = require("./Controllers/HutangController.js");
const routeGroup = require("./Functions/routeGroup.js");

const Route = express.Router();

const allowIp = [
    "180.245.231.27"
];

Route.get("/ipadress", (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    return res.send(`${req.ip} + ${ip} + ${req.hostname} + ${req.headers['user-agent']}`)
})

Route.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const check = allowIp.includes(ip);
    if (!check) {
        return res.send("Wkwkwkw Gk bisa masuk yahhh")
    }
    return next();
})

Route.get("/api/hutang", HutangController.index);
Route.post("/api/hutang", HutangController.store);
Route.put("/api/hutang/:id", HutangController.update);
Route.delete("/api/hutang/:id", HutangController.destroy);

module.exports = Route;
