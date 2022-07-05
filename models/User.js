const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {
            type: String, 
            required: true, 
        }, 
        email: {
            type: String, 
            required: true
        }, 
        password: {
            type: String, 
            required: true
        }, 
        gamesPlayed: {
            type: Number,
            default: 0
        }, 
        gamesWon: {
            type: Number, 
            default: 0
        }
    }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model