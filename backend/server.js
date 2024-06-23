require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')
const settingsRoutes = require('./routes/settings')
const { getSettings } = require('./controllers/settingsController')
const Settings = require('../backend/models/settingsModel');

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
app.use('/api/settings', settingsRoutes)


//CONNECTING TO DATABASE
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to Database and listening on port", process.env.PORT)
        })

        //Create Settings if not already exisit
        await initialiseSettings()

    })
    .catch((error) => {
        console.log(error)
    })



//INITIALISE METHODS
const initialiseSettings = async () => {

    //Initial Default Settings 
    username = "DEFAULT"
    workingHours = 10

    //CREATE DEFAULT SETTINGS
    try {
        const existingSetting = await Settings.findById('settings');

        if (!existingSetting) {
            console.log("Settings Document does not exist, creating one");
            const newSetting = new Settings({ _id: 'settings', username, workingHours });
            await newSetting.save();
            console.log('Settings document created');
        } else {
            console.log("Settings Document already exists");
        }
    } catch (error) {
        console.error('Error initializing settings:', error);
    }


}