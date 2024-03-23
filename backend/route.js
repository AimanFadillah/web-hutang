const express = require("express");
const HutangController = require("./Controllers/HutangController.js");
const routeGroup = require("./Functions/routeGroup.js");
const geoip = require('geoip-lite');

const Route = express.Router();

const allowIp = [
    "180.245.231.27"
];

Route.get("/ipadress", (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    return res.send(`${req.ip} + ${ip} + ${req.hostname} + ${req.headers['user-agent']}`)
})

Route.get("/ipserver", async (req, res) => {
    const response = await fetch("https://web-hutang.vercel.app/ipadress");
    return res.send(`${await response.text()}`);
})

Route.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip)
    if(geo && geo.country !== "ID"){
        return res.send("<h1>Kamu pasti web scraping 😍</h1>")
    } else {
        const check = allowIp.includes(ip);
        if (!check) {
            return res.send("<h1>Maaf Kamu tidak di izinkan Masuk😋</h1>")
        }else{
            return next();
        }
    }
})

Route.get("/api/hutang", HutangController.index);
Route.post("/api/hutang", HutangController.store);
Route.put("/api/hutang/:id", HutangController.update);
Route.delete("/api/hutang/:id", HutangController.destroy);

module.exports = Route;
