const mongoose = require('mongoose'),
    User = require('./player')

mongoose.connect('mongodb://localhost:27017/mongoose-bcrypt-test', (err) => {
    if (err) throw err
    console.log("Connected to MongoDB")
})

