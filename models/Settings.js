const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SettingsSchema = new Schema ({
    text: {
        type: String
    }, 
    toggled: {
        type: Boolean, 
        default: false
    }
})

const Settings = mongoose.model('Settings', SettingsSchema)

module.exports = Settings