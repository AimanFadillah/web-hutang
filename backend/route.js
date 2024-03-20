const express = require("express");
const HutangController = require("./Controllers/HutangController.js");
const routeGroup = require("./Functions/routeGroup.js");

const Route = express.Router();

const allowIp = [
    "180.245.231.27"
];

routeGroup(Route, function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const check = allowIp.find(data => data === ip);
    if (!check) {
        return res.sendStatus(404)
    }
    return next();
}, (route) => {
    route.get("/api/hutang", HutangController.index);
    route.post("/api/hutang", HutangController.store);
    route.put("/api/hutang/:id", HutangController.update);
    route.delete("/api/hutang/:id", HutangController.destroy);
})

module.exports = Route;
