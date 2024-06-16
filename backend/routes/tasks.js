//IMPORTS
const express = require('express')
const Task = require('../models/taskModel')
const { model } = require('mongoose')
const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/taskController')

//ESTABLISHING ROUTER
const router = express.Router()

//DEFINING ROUTES
/** router.get('/')
 * 
 * GET request for getting all Tasks
 * 
 */
router.get('/', getTasks)

/** router.get('/:id')
 * GET request for getting a single Task by ID
 */
router.get('/:id', getTask)

/** router.post('/')
 * POST request to add a new task
 */
router.post('/', createTask)


/** router.delete('/:id')
 * DELETE request for deleting a single task by ID
 */
router.delete('/:id', deleteTask)

/** router.update('/:id)
 * Updated task given id
 */
router.patch('/:id', updateTask)

//EXPORT ROUTES
module.exports = router