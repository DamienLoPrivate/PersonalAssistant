require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

//MIDDLEWARE

//Read out of all requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//ROUTES


//CONNECTING TO DATABASE
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to Database and listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })