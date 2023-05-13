const groupModel = require('../models/group-model')
const ApiError = require('../exceptions/api-exception')
const userModel = require('../models/user-model')
const apiaryModel = require('../models/apiary-model')
const apiaryService = require('../service/apiary-service')
const userService = require('../service/user-service')
const GroupDto = require('../dtos/group-dto')

class GroupService{
    async isOwnGroup(userId, groupId)
    {
        const groupData = await groupModel.findById(groupId)

        return groupData.userId == userId;
    }
    async getUserOwnGroups(userId){
        const userData = await userModel.findById(userId)
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        const groupsData = await groupModel.find({userId})
        return groupsData
    }
    async getUserGroups(userId){
        const userData = await userModel.findById(userId)
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        let groupsData = [];

        for (const groupId of userData.groups) {
            const groupData = await groupModel.findById(groupId)
            groupsData.push(groupData)
        }

        const groupData = await groupModel.find({userId})
        groupsData = [...groupsData, ...groupData]
        return groupsData
    }
    async remove_allowed_apiary(userId, groupId, apiaryId)
    {
        const apiaryData = await apiaryModel.findOne({_id: apiaryId})
        if(!apiaryData){
            throw ApiError.BadRequest('No such apiary')
        }

        if(!await apiaryService.isOwnApiary(userId, apiaryId)
            && !await this.isOwnGroup(userId, groupId))
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

        const groupData = await groupModel.findByIdAndUpdate(groupId, {$addToSet: {allowedApiaries: apiaryId}})

        return groupData;
    }

    async remove_user(ownUserId, groupId, userId)
    {
        const userData = await userModel.findById(userId)
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        if(!await this.isOwnGroup(ownUserId, groupId))
        {
            throw ApiError.BadRequest('Incorrect user')
        }

        const usersData = await userModel.findByIdAndUpdate(userId, {$pull: {groups: groupId}})

        const groupsData = await groupModel.findByIdAndUpdate(groupId, {$pull: {users: userId}})
    }

    async add_user(ownUserId, groupId, userId)
    {
        const userData = await userModel.findById(userId)
        if(!userData){
            throw ApiError.BadRequest('Incorrect user')
        }

        if(!await this.isOwnGroup(ownUserId, groupId))
        {
            throw ApiError.BadRequest('Incorrect user')
        }

        const groupData = await groupModel.findByIdAndUpdate(groupId, {$addToSet: {users: userId}})

        const usData = await userModel.findByIdAndUpdate(userId, {$addToSet: {groups: groupId}})

        return groupData;
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
        const usersData = await userService.getGroupUsers(id)

        let apiaries = []
        for (const apiaryId of groupData.allowedApiaries) {
            const apiaryData = await apiaryModel.findById(apiaryId)
            apiaries.push(apiaryData)
        }

        let group = new GroupDto(groupData)

        group.users = usersData
        group.allowedApiaries = apiaries
        return group
    }
    async set(ownUserId, id, name) {
        const groupData = await groupModel.findById(id)
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