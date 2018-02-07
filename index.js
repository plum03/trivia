const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const playerRoute = require('./routes/player')

const config = require('./config')
// const port = config.port || 5000

const app = express()

// middleware
app.use(bodyParser.json())

// routes
app.use("/player", playerRoute)

mongoose.connect('mongodb://localhost:27017/trivia', () => {
    console.log('MongoDB is connected')
})

app.listen(config.port, () => {
    console.log("Listening on port " +config.port)
})