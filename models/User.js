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
        }, 
        superHero: {
            type: Boolean, 
            default: false
        }, 
        scifi: {
            type: Boolean, 
            default: false
        },
        comedies: {
            type: Boolean, 
            default: false
        }, 
        bestPictures: {
            type: Boolean, 
            default: false
        }
    }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model