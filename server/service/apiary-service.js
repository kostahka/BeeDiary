const apiaryModel = require('../models/apiary-model')
const ApiError = require('../exceptions/api-exception')
const userModel = require('../models/user-model')
const hiveModel = require('../models/hive-model')
const groupModel = require('../models/group-model')
const ApiaryDto = require('../dtos/apiary-dto')

class ApiaryService{
    async isOwnApiary(userId, apiaryId)
    {
        const apiaryData = await apiaryModel.findById(apiaryId)
        return apiaryData.userId == userId;
    }
    async addAllowedUser(ownUserId, userId, apiaryId){
        if(!await this.isOwnApiary(ownUserId, apiaryId))
        {
            throw ApiError.BadRequest('Incorrect user')
        }

        const user = await userModel.findById(userId)
        if(!user){
            throw ApiError.BadRequest('Incorrect user')
        }

        const apiary = await apiaryModel.findById(apiaryId)
        if(!apiary){
            throw ApiError.BadRequest('No such apiary')
        }

        const userData = await userModel.findByIdAndUpdate(userId, {$addToSet: {allowedApiaries: apiaryId}})
        const apiaryData = await apiaryModel.findByIdAndUpdate(apiaryId, {$addToSet: {allowedUsers: userId}})
        return apiaryData
    }
    async removeFromAllowedUser(ownUserId, userId, apiaryId){
        if(!await this.isOwnApiary(ownUserId, apiaryId))
        {
            throw ApiError.BadRequest('Incorrect user')
        }

        const user = await userModel.findById(userId)
        if(!user){
            throw ApiError.BadRequest('Incorrect user')
        }

        const apiary = await apiaryModel.findById(apiaryId)
        if(!apiary){
            throw ApiError.BadRequest('No such apiary')
        }

        const userData = await userModel.findByIdAndUpdate(userId, {$pull: {allowedApiaries: apiaryId}})
        const apiaryData = await apiaryModel.findByIdAndUpdate(apiaryId, {$pull: {allowedUsers: userId}})
        return apiaryData
    }
    async getUserOwnApiaries(userId){
        const userData = await userModel.findById(userId)
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        const apiariesData = await apiaryModel.find({userId})
        return apiariesData
    }
    async getAll(nickname){
        const userData = await userModel.findOne({nickname})
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }
        const apiaries = await apiaryModel.find({userId: userData._id})

        let apiariesData = [...apiaries]

        for (const apiaryId of userData.allowedApiaries) {
            const apiaryData = await apiaryModel.findById(apiaryId)
            if(!apiariesData.some(a => a._id.equals(apiaryData._id)))
                apiariesData.push(apiaryData)
        }

        for (const groupId of userData.groups) {
            const groupData = await groupModel.findById(groupId)
            for (const apiaryId of groupData.allowedApiaries) {
                const apiaryData = await apiaryModel.findById(apiaryId)
                if(!apiariesData.some(a => a._id.equals(apiaryData._id)))
                    apiariesData.push(apiaryData)
            }
        }

        const groupsData = await groupModel.find({userId: userData._id})
        for (const groupData of groupsData) {
            for (const apiaryId of groupData.allowedApiaries) {
                const apiaryData = await apiaryModel.findById(apiaryId)
                if(!apiariesData.some(a => a._id.equals(apiaryData._id)))
                    apiariesData.push(apiaryData)
            }
        }

        return apiariesData
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
        const hivesData = await hiveModel.find({apiaryId: id}) || []
        let users = []
        for (const userId of apiaryData.allowedUsers) {
            const userData = await userModel.findById(userId)
            users.push(userData)
        }
        const userData = await userModel.findById(apiaryData.userId)
        users.push(userData)

        const apiary = {... new ApiaryDto(apiaryData), hives: hivesData}
        apiary.allowedUsers = users
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