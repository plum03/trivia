const express = require("express");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
const Player = require("../models/player");

authRoutes.post("/signup", (req, res) => {
    Player.findOne({username: req.body.username}, (err, player) => {
        if (err) return res.status(500).send(err);
        if (player) return res.status(400).send({err: "Username already exists"});
        const newPlayer = new Player(req.body);
            newPlayer.save(err => {
                if (err) return res.status(500).send({success: false, err});
                return res.status(201).send({success: true, newPlayer})
            })
    })
})

authRoutes.post("/login", (req, res) => {
    Player.findOne({username: req.body.username}, (err, player) => {
        if (err) return res.status(500).send(err);
        if(!player) {
            return res.status(403).send({err: "Username or password is incorrect."})
        } else if (player) {
            player.comparePassword(req.body.password, (err, match) => {
                if (err) res.status(403).send(err);
                if (!match) res.status(403).send({err: "Username or password is incorrect."})
                const token = jwt.sign(player.withoutPassword(), process.env.SECRET);
                return res.send({success: true, token, player})
            })
        }
    })
})



module.exports = authRoutes;