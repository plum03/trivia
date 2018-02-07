const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema ({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})