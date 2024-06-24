//FILE FOR FUNCTIONS TO BE USED IN SETTING ROUTES


//REQUIRE PACKAGES
const Settings = require('../models/settingsModel')
const mongoose = require('mongoose')


//SETTING FUNCTIONS
/** create Settings
 * Creates settings document if does not already exisit
 * @param {*} req 
 * @param {*} res 
 */
const createSettings = async (req, res) => {
    //Define Settings content variables
    const { username, workingHours } = req.body

    //Check if Settings Already Exist, if so through return exisitng setting
    const exisitingSettings = Settings.findById({ _id: "settings" })
    if (exisitingSettings) {
        console.log("Settings Document Already Exsists")
        return res.status(409).json({ exisitingSettings })
    }

    //Create Settings Object
    try {
        const setting = await Settings.create({ username, workingHours })
        res.status(200).json(username, workingHours)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/** getSetting
 * Responses an array of all settings in databases
 * @param {*} req 
 * @param {*} res 
 */
const getSettings = async (req, res) => {
    //Storing all settings in "settings"
    const settings = await Settings.find({ _id: 'settings' })

    //Checking if settings exist
    if (!settings) {
        res.status(404).json({ error: "Settings page does not exists" })
    } else {
        res.status(200).json(settings)
    }
}

/** updateSettings
 * Updates a settings
 * @param {*} req 
 * @param {*} res 
 */
const updateSettings = async (req, res) => {

    //Defining Settings Update Variables
    const { username, workingHours } = req.body
    const settings = await Settings.findOneAndUpdate({ _id: "settings" },
        {
            username: username,
            workingHours: workingHours
        },
        { new: true }    //Return new document to db
    )

    //Return Updated settings
    res.status(200).json(settings)
}

//EXPORT FUNCTIONS
module.exports = {
    getSettings,
    updateSettings,
    createSettings,
}
