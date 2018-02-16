const express = require('express')
const playerRoute = express.Router();
const expressJwt = require("express-jwt");

const Player = require('../models/player')


playerRoute.use(expressJwt({secret: process.env.SECRET}))

playerRoute.route("/verify")
    .get((req, res) => {
        Player.findById(req.user._id, (err, player) => {
            if (err) {
                res.status(500).send({success: false, err})
            } else if (player === null) {
                res.status(400).send({success: false, err})
            } else {
                res.status(200).send({success: true, player: player.withoutPassword()})
            }
        })
    })


// get ONE player (w/ token thru api/player route)
playerRoute.route("/")
.get((req, res) => {
    Player.findById(req.user._id, (err, player) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(player);
    });
})

// edit player info
playerRoute.put("/", (req, res) => {
    Player.findByIdAndUpdate(req.user._id, req.body, {
        new: true
    }, (err, updatedPlayer) => {
        if (err) 
            return res.status(500).send(err)
        return res.send(updatedPlayer);
    })
});

playerRoute.put("/:increment", (req, res) => {
    Player.findById(req.user._id, (err, player) => {
        if (err) 
            return res.status(500).send(err)
        player[req.params.increment]++;
        player.save(err => {
            if (err) 
                return res.status(500).send(err)
            return res.send(player);
        });
    });
});

// delete player account
playerRoute.delete("/", (req, res) => {
    Player.findByIdAndRemove(req.user._id, (err, deletedPlayer) => {
        if (err) 
            return res.status(500).send(err)
        return res.send('Thank you.  Your request was recieved and your account has been deleted')
    })
})

module.exports = playerRoute