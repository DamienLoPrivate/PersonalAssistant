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

    hoursRequired: {
        type: Number,
        required: false
    },

    description: {
        type: String,
        required: false
    },

    completedStatus: {
        type: Boolean,
        required: true
    },

    timeElapsed: {
        type: Number,
        required: true
    }


}, { timestamps: true })


//EXPORT
module.exports = mongoose.model('Task', taskSchema)