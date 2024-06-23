//IMPORTS
const express = require('express')
const Task = require('../models/taskModel')
const { model } = require('mongoose')
const {
    getSettings,
    updateSettings,
    createSettings
} = require('../controllers/settingsController')

//ESTABLISHING ROUTER
const router = express.Router()

//DEFINING ROUTES
/** router.post
 * 
 * POST request for creating a new settting
 * 
 */
router.post('/', createSettings)

/** router.get('/')
 * 
 * GET request for getting all settings
 * 
 */
router.get('/', getSettings)

/** router.update('/:id)
 * Updated task given id
 */
router.patch('/', updateSettings)

//EXPORT ROUTES
module.exports = router