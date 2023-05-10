const groupModel = require('../models/group-model')
const ApiError = require('../exceptions/api-exception')
const userModel = require('../models/user-model')
const apiaryModel = require('../models/apiary-model')
const apiaryService = require('../service/apiary-service')

class GroupService{
    async isOwnGroup(userId, groupId)
    {
        const groupData = await groupModel.findById(groupId)
        return groupData.userId === userId;
    }
    async getUserGroups(userId){
        const userData = await userModel.findById(userId)
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        let groupsData = [];
        await userData.groups.forEach(async groupId => {
            const groupData = await groupModel.findById(groupId)
            groupsData.push(groupData)
        })
        return groupsData
    }
    async remove_allowed_apiary(userId, groupId, apiaryId)
    {
        const apiaryData = await apiaryModel.findOne({_id: apiaryId})
        if(!apiaryData){
            throw ApiError.BadRequest('No such apiary')
        }

        if(!await apiaryService.isOwnApiary(userId, apiaryId))
        {
            throw ApiError.BadRequest('Incorrect user')
        }

        const groupsData = await groupModel.updateMany({_id: groupId}, {$pull: {allowedApiaries: apiaryId}})
        return groupsData
    }
    async add_allowed_apiary(userId, groupId, apiaryId)
    {
        const apiaryData = await apiaryModel.findOne({_id: apiaryId})
        if(!apiaryData){
            throw ApiError.BadRequest('No such apiary')
        }

        if(!await apiaryService.isOwnApiary(userId, apiaryId))
        {
            throw ApiError.BadRequest('Incorrect user')
        }

        const groupData = this.get(groupId)

        if(!groupData.allowedApiaries)
            groupData.allowedApiaries = [];
        groupData.allowedApiaries = [...groupData.allowedApiaries, apiaryId];

        return groupData.save();
    }

    async remove_user(ownUserId, groupId, userId)
    {
        const userData = await userModel.findOne({_id: userId})
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        if(!await this.isOwnGroup(ownUserId, groupId))
        {
            throw ApiError.BadRequest('Incorrect user')
        }

        const groupsData = await groupModel.updateMany({_id: groupId}, {$pull: {users: userId}})
    }

    async add_user(ownUserId, groupId, userId)
    {
        const userData = await userModel.findOne({_id: userId})
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        if(!await this.isOwnGroup(ownUserId, groupId))
        {
            throw ApiError.BadRequest('Incorrect user')
        }

        const groupData = this.get(groupId)

        if(!groupData.users)
            groupData.users = [];
        groupData.users = [...groupData.users, userId];

        if(!userData.groups)
            userData.groups = [];
        userData.groups = [...userData.groups, groupId];

        return groupData.save();
    }

    async add(id, name){
        const userData = await userModel.findOne({_id: id})
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        return await groupModel.create({userId: id, name})
    }
    async get(id){
        let groupData = await groupModel.findById(id)
        if(!groupData){
            throw ApiError.BadRequest('No such group')
        }
        return groupData
    }
    async set(ownUserId, id, name) {
        const groupData = await groupModel.findOne({_id: id})
        if(!groupData){
            throw ApiError.BadRequest('No such group')
        }
        if(!await this.isOwnGroup(ownUserId, id))
        {
            throw ApiError.BadRequest('Incorrect user')
        }
        groupData.name = name
        return groupData.save();
    }
    async delete(ownUserId, id){
        if(!await this.isOwnGroup(ownUserId, id))
        {
            throw ApiError.BadRequest('Incorrect user')
        }
        const usersData = await userModel.updateMany({groups: id}, {$pull: {groups: id}})
        const groupData = await groupModel.findByIdAndDelete(id)
        return groupData
    }
}

module.exports = new GroupService()