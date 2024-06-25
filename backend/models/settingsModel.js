// Aquiring packanges
const mongoose = require('mongoose')


//Variable Dec
const Schema = mongoose.Schema

//Task schema
const settingsSchema = new Schema({
    _id: { type: String, default: 'settings' },

    username: {
        type: String,
        required: true
    },

    workingHours: {
        type: Number,
        required: true
    }

}, { _id: false })


//EXPORT
module.exports = mongoose.model('Settings', settingsSchema)