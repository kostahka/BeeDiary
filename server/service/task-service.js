const ApiError = require('../exceptions/api-exception')
const apiaryModel = require('../models/apiary-model')
const taskModel = require('../models/task-model')
const hiveModel = require('../models/hive-model')
const TaskDto = require('../dtos/task-dto')

class TaskService{
    async add(hiveId, text){
        const hiveData = await hiveModel.findById(hiveId)
        if(!hiveData){
            throw ApiError.BadRequest('No such hive')
        }

        return await taskModel.create({text: text, isCompleted: false, hiveId})
    }
    async getApiaryTasks(apiaryId){
        const apiaryData = await apiaryModel.findById(apiaryId)
        if(!apiaryData){
            throw ApiError.BadRequest('No such apiary')
        }

        const hivesData = await hiveModel.find({apiaryId})

        let tasksData = []

        for (const hiveData of hivesData) {
            const subtasksData = await taskModel.find({hiveId: hiveData._id})
            for(let taskData of subtasksData){
                const task = new TaskDto(taskData, hiveData)
                tasksData.push(task)
            }
        }

        return tasksData
    }
    async getAll(hiveId){
        let tasksData = await taskModel.find({hiveId})
        return tasksData
    }
    async get(id){
        let taskData = await taskModel.findById(id)
        if(!taskData){
            throw ApiError.BadRequest('No such task')
        }
        return taskData
    }
    async set(id, text) {
        const taskData = await taskModel.findById(id)
        if(!taskData){
            throw ApiError.BadRequest('No such task')
        }
        taskData.text = text
        return taskData.save();
    }
    async setCompleted(id, complete) {
        const taskData = await taskModel.findById(id)
        if(!taskData){
            throw ApiError.BadRequest('No such task')
        }
        taskData.isCompleted = complete
        return taskData.save();
    }
    async delete(id){
        const taskData = await taskModel.findByIdAndDelete(id)
        return taskData
    }
}

module.exports = new TaskService()