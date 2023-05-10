const groupService = require('../service/group-service')
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-exception");

class GroupController{
    async getUserGroups(req, res, next){
        try{
            const {id} = req.params
            const groupsData = await groupService.getUserGroups(id)
            return res.json(groupsData)
        }catch (e){
            next(e)
        }
    }
    async removeAllowedApiary(req, res, next){
        try{
            const {apiaryId, groupId} = req.body
            const ownUserId = req.user.id;
            const groupData = await groupService.remove_allowed_apiary(ownUserId, groupId, apiaryId)
            return res.json(groupData)
        }catch (e){
            next(e)
        }
    }
    async addAllowedApiary(req, res, next){
        try{
            const {apiaryId, groupId} = req.body
            const ownUserId = req.user.id;
            const groupData = await groupService.add_allowed_apiary(ownUserId, groupId, apiaryId)
            return res.json(groupData)
        }catch (e){
            next(e)
        }
    }
    async removeUserFromGroup(req, res, next){
        try{
            const {userId, groupId} = req.body
            const ownUserId = req.user.id;
            const groupData = await groupService.remove_user(ownUserId, groupId, userId)
            return res.json(groupData)
        }catch (e){
            next(e)
        }
    }
    async addUserToGroup(req, res, next){
        try{
            const {userId, groupId} = req.body
            const ownUserId = req.user.id;
            const groupData = await groupService.add_user(ownUserId, groupId, userId)
            return res.json(groupData)
        }catch (e){
            next(e)
        }
    }
    async getGroup(req, res, next){
        try{
            const {id} = req.params
            const groupData = await groupService.get(id)
            return res.json(groupData)
        }catch (e){
            next(e)
        }
    }
    async setGroup(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {id} = req.params
            const {name} = req.body
            const ownUserId = req.user.id;
            const groupData = await groupService.set(ownUserId, id, name)
            return res.json(groupData)
        }catch (e){
            next(e)
        }
    }
    async addGroup(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {id} = req.params
            const {name} = req.body
            const groupData = await groupService.add(id, name)
            return res.json(groupData)
        }catch (e){
            next(e)
        }
    }
    async deleteGroup(req, res, next){
        try{
            const {id} = req.params
            const ownUserId = req.user.id;
            const groupData = await groupService.delete(ownUserId, id)
            return res.json(groupData)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new GroupController()