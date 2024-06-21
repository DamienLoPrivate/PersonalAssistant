//FILE FOR FUNCTIONS TO BE USED IN ROUTES


//REQUIRE PACKAGES
const Task = require('../models/taskModel')
const mongoose = require('mongoose')


//TASK FUNCTIONS

/** getTasks
 * Responses an array of all tasks in database sorted in decending order
 * @param {*} req 
 * @param {*} res 
 */
const getTasks = async (req, res) => {
    //Storing all Tasks in "tasks"
    const tasks = await Task.find({}).sort({ createdAt: -1 })
    //Response Json
    res.status(200).json(tasks)
}

/** getTask
 * Response a single task by id
 * @param {*} req 
 * @param {*} res 
 */
const getTask = async (req, res) => {
    //Define ID and check validity, return if invalid
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' })
    }

    //Find Task by id, return if non-exsistant
    const task = await Task.findById(id)
    if (!task) {
        return res.status(404).json({ error: 'No such task' })
    }

    //Response Json
    res.status(200).json(task)
}

/** createTask
 * Creates a task given inputs from request
 *  @param {*} req
 *  @param {*} res
 */
const createTask = async (req, res) => {
    //Define task content variables
    const { title, dueDate, datesRequired, hoursRequired, description } = req.body

    //Create Task Object
    try {
        const task = await Task.create({ title, dueDate, datesRequired, hoursRequired, description })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/** deleteTask
 * Deletes a task given an id
 * @param {*} req 
 * @param {*} res 
 */
const deleteTask = async (req, res) => {
    //Define ID and check validity, return if invalid
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' })
    }

    //Delete Task if possible
    const task = await Task.findOneAndDelete({ _id: id })
    if (!task) {
        return res.status(404).json({ error: 'No such task' })
    }

    //Return Deleted Task
    res.status(200).json(task)
}
/** updateTask
 * Updates a task given id
 * @param {*} req 
 * @param {*} res 
 */
const updateTask = async (req, res) => {
    //Define ID and check validity, return if invalid
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' })
    }

    //Defining Task Update Variables
    const { title } = req.body
    const task = await Task.findOneAndUpdate({ _id: id },
        { title: title },
        { new: true }    //Return new document to db
    )

    //Check if Update is possible
    if (!task) {
        return res.status(400).json({ error: 'No such task' })
    }

    //Return Updated Task
    res.status(200).json(task)
}


//EXPORT FUNCTIONS
module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}



