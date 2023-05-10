const apiaryModel = require('../models/apiary-model')
const ApiError = require('../exceptions/api-exception')
const userModel = require('../models/user-model')
const hiveModel = require('../models/hive-model')
const groupModel = require('../models/group-model')

class ApiaryService{
    async isOwnApiary(userId, apiaryId)
    {
        const apiaryData = await apiaryModel.findById(apiaryId)
        return apiaryData.userId === userId;
    }

    async getAll(nickname){
        const userData = await userModel.findOne({nickname})
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }
        const apiaries = await apiaryModel.find({userId: userData._id})
        return apiaries
    }
    async add(nickname, name){
        const userData = await userModel.findOne({nickname})
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        return await apiaryModel.create({userId: userData._id, name})
    }

    async get(id){
        let apiaryData = await apiaryModel.findById(id)
        if(!apiaryData){
            throw ApiError.BadRequest('No such apiary')
        }
        const hivesData = await hiveModel.find({apiary_id: id}) || []
        const apiary = {_id: apiaryData.id, name:apiaryData.name, hives: hivesData}
        return apiary
    }
    async set(userId, id, name) {
        const apiaryData = await apiaryModel.findOne({_id: id})
        if(!await this.isOwnApiary(userId, id))
        {
            throw ApiError.BadRequest('Incorrect user')
        }
        if(!apiaryData){
            throw ApiError.BadRequest('No such apiary')
        }
        apiaryData.name = name
        return apiaryData.save();
    }
    async delete(userId, id){
        if(!await this.isOwnApiary(userId, id))
        {
            throw ApiError.BadRequest('Incorrect user')
        }
        const usersData = await userModel.updateMany({allowedApiaries: id}, {$pull: {allowedApiaries: id}})
        const groupsData = await groupModel.updateMany({allowedApiaries: id}, {$pull: {allowedApiaries: id}})
        await hiveModel.deleteMany({apiaryId: id})
        const apiaryData = await apiaryModel.findByIdAndDelete(id)
        return apiaryData
    }
}

module.exports = new ApiaryService()