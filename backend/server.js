require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')

const app = express()

//MIDDLEWARE

//Read out of all requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Pass Data Stored in Request to Request Object
app.use(express.json())


//ROUTES
app.use('/api/tasks', taskRoutes)


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