const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller')

router.put('/add/:id', taskController.addTask)
router.get('/get/:id', taskController.getTask)
router.get('/getApiaryAll/:id', taskController.getApiaryTasks)
router.get('/getAll/:id', taskController.getTasks)
router.post('/set/:id', taskController.setTask)
router.post('/setCompletion/:id', taskController.setTaskCompletion)
router.delete('/delete/:id', taskController.deleteTask)

module.exports = router;