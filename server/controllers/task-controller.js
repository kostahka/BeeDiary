const taskService = require('../service/task-service')

class TaskController{
    async addTask(req, res, next){
        try{
            const {id} = req.params
            const {text} = req.body
            const task = await taskService.add(id, text)
            return res.json(task)
        }catch (e){
            next(e)
        }
    }
    async getApiaryTasks(req, res, next){
        try{
            const {id} = req.params
            const tasks = await taskService.getApiaryTasks(id)
            return res.json(tasks)
        }catch (e){
            next(e)
        }
    }
    async getTasks(req, res, next){
        try{
            const {id} = req.params
            const tasks = await taskService.getAll(id)
            return res.json(tasks)
        }catch (e){
            next(e)
        }
    }
    async getTask(req, res, next){
        try{
            const {id} = req.params
            const task = await taskService.get(id)
            return res.json(task)
        }catch (e){
            next(e)
        }
    }
    async setTask(req, res, next){
        try{
            const {id} = req.params
            const {text} = req.body
            const taskData = await taskService.set(id, text)
            return res.json(taskData)
        }catch (e){
            next(e)
        }
    }
    async setTaskCompletion(req, res, next){
        try{
            const {id} = req.params
            const {complete} = req.body
            const taskData = await taskService.setCompleted(id, complete)
            return res.json(taskData)
        }catch (e){
            next(e)
        }
    }
    async deleteTask(req, res, next){
        try{
            const {id} = req.params
            const taskData = await taskService.delete(id)
            return res.json(taskData)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new TaskController()