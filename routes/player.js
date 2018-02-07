const express = require('express')
const playerRoute = express.Router()

const Player = require('../models/player')

// retrieve ALL players, I will use this to ensure no repeat username with addPlayer()
playerRoute.get("/", (req, res) => {
    Player.find((err, players) => {
        if (err) return res.status(500).send(err)
        return res.send(players)
    })
})

// add new player to db
playerRoute.post("/", (req, res) => {
    const newPlayer = new Player(req.body)
    newPlayer.save((err) => {
        if (err) return res.status(500).send(err)
        return res.send("Your account was successfully created.  Happy Playing!")
    })
})

// retrieve ONE player, for player stats page
playerRoute.get("/:id", (req, res) => {
    Player.findById(req.params.id, (err, player) => {
        if (err) return res.status(500).send(err)
        return res.send(player)
    })
})

// edit player info
playerRoute.put("/:id", (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPlayer) => {
        if (err) return res.status(500).send(err)
        return res.send(updatedPlayer)
    })
})

// delete player account
playerRoute.delete("/:id", (req, res) => {
    Player.findByIdAndRemove(req.params.id, (err, deletedPlayer) => {
        if (err) return res.status(500).send(err)
        return res.send('Thank you.  Your request was recieved and your account has been deleted')
    })
})