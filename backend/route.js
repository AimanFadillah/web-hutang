const express = require("express");
const RouteGroup = require("./Functions/routeGroup.js");
const Auth = require("./Middleware/AuthMiddleware.js");
const HutangController = require("./Controllers/HutangController.js");
const routeGroup = require("./Functions/routeGroup.js");

const Route = express.Router();

Route.get("/ipadress", (req, res) => {
    return res.send("address:" + req.headers['x-forwarded-for'] || req.socket.remoteAddress);
})

routeGroup(Route, function (req, res, next) {
    console.log(req.ip);
    return next();
}, (route) => {
    route.get("/api/hutang", HutangController.index);
    route.post("/api/hutang", HutangController.store);
    route.put("/api/hutang/:id", HutangController.update);
    route.delete("/api/hutang/:id", HutangController.destroy);
})

module.exports = Route;
