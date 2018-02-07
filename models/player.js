const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require(bcrypt),
    SALT_WORK_FACTOR = 10;

const PlayerSchema = new mongoose.Schema ({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    totalAttempts: {
        type: Number,
        default: 0
    },
    scorePerct: {
        type: Number,
        default: 0
    },
    playerRank: {
        type: Number,
        default: null
    }
})

module.exports = mongoose.model(PlayerSchema)