const express = require("express");
const HutangController = require("./Controllers/HutangController.js");
const routeGroup = require("./Functions/routeGroup.js");

const Route = express.Router();

const allowIp = [
    "180.245.231.27"
];

Route.get("/ipadress", (req, res) => {
    const ip = req.socket.remoteAddress
    return res.send(ip)
})

routeGroup(Route, function (req, res, next) {
    const ip = req.socket.remoteAddress;
    const check = allowIp.includes(ip);
    if (!check) {
        return res.send("Wkwkwkw Gk bisa masuk yahhh")
    }
    return next();
}, (route) => {
    route.get("/api/hutang", HutangController.index);
    route.post("/api/hutang", HutangController.store);
    route.put("/api/hutang/:id", HutangController.update);
    route.delete("/api/hutang/:id", HutangController.destroy);
})

module.exports = Route;
