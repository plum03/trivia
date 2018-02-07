const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const port = config.port || 5000

// const playerRoute = require('./routes/')
const app = express()

app.use(bodyParser.json())

// app.use("/player", require('playerRoute'))

mongoose.connect('mongodb://localhost/trivia', () => {
    console.log('MongoDB is connected')
})

app.listen(port, () => {
    console.log("Listening on port " +port)
})