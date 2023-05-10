const apiaryService = require('../service/apiary-service')
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-exception");

class ApiaryController{
    async getApiaries(req, res, next){
        try{
            const {nickname} = req.params
            const apiaries = await apiaryService.getAll(nickname)
            return res.json(apiaries)
        }catch (e){
            next(e)
        }
    }
    async getApiary(req, res, next){
        try{
            const {id} = req.params
            const apiary = await apiaryService.get(id)
            return res.json(apiary)
        }catch (e){
            next(e)
        }
    }
    async setApiary(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {id} = req.params
            const {name} = req.body
            const ownUserId = req.user.id;
            const apiary = await apiaryService.set(ownUserId, id, name)
            return res.json(apiary)
        }catch (e){
            next(e)
        }
    }
    async addApiary(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {nickname} = req.params
            const {name} = req.body
            const apiary = await apiaryService.add(nickname, name)
            return res.json(apiary)
        }catch (e){
            next(e)
        }
    }
    async deleteApiary(req, res, next){
        try{
            const {id} = req.params
            const ownUserId = req.user.id;
            const apiaryData = await apiaryService.delete(ownUserId, id)
            return res.json(apiaryData)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new ApiaryController()