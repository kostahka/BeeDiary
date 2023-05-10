const groupModel = require('../models/group-model')
const ApiError = require('../exceptions/api-exception')
const userModel = require('../models/user-model')
const apiaryModel = require('../models/apiary-model')
const taskModel = require('../models/task-model')
const hiveModel = require('../models/hive-model')

class TaskService{
    async add(hiveId, text){
        const hiveData = await hiveModel.findById(hiveId)
        if(!hiveData){
            throw ApiError.BadRequest('No such hive')
        }

        return await taskModel.create({text, isCompleted: false, hiveId})
    }
    async getApiaryTasks(apiaryId){
        const apiaryData = await apiaryModel.findById(apiaryId)
        if(!apiaryData){
            throw ApiError.BadRequest('No such apiary')
        }

        const hivesData = await hiveModel.find({apiaryId})

        let tasksData = []
        await hivesData.forEach(async hiveData => {
            const subtasksData = await taskModel.find({hiveId: hiveData._id})
            tasksData = [...tasksData, ...subtasksData]
        })

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