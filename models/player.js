const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
    

const PlayerSchema = new Schema ({

    username: {
        type: String,
        required: true,
        index: {unique: true}
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

PlayerSchema.pre('save', function(next) {
    var user = this
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt)  {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

PlayerSchema.methods.comparePassword = function (candidatePassword, cb)  {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model("Player", PlayerSchema)