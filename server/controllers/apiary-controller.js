const apiaryService = require('../service/apiary-service')

class ApiaryController{
    async getApiaries(req, res, next){
        try{
            const apiaries = apiaryService.getAll()
            return res.json(apiaries)
        }catch (e){
            next(e)
        }
    }
    async getApiary(req, res, next){
        try{

        }catch (e){
            next(e)
        }
    }
    async setApiary(req, res, next){
        try{

        }catch (e){
            next(e)
        }
    }
    async addApiary(req, res, next){
        try{

        }catch (e){
            next(e)
        }
    }
}

module.exports = new ApiaryController()