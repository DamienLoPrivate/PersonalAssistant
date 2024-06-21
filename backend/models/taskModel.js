// Aquiring packanges
const mongoose = require('mongoose')
const { format, addDays, parseISO, differenceInDays } = require('date-fns');


//Variable Dec
const Schema = mongoose.Schema

//Task schema
const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: false
    },

    datesRequired: {
        type: Number,
        required: false
    },

    desccription: {
        type: String,
        required: false
    },

}, { timestamps: true })


//EXPORT
module.exports = mongoose.model('Task', taskSchema)