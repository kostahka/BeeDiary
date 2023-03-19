const apiaryService = require('../service/apiary-service')

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
            const {id} = req.params
            const {name} = req.body
            const apiary = await apiaryService.set(id, name)
            return res.json(apiary)
        }catch (e){
            next(e)
        }
    }
    async addApiary(req, res, next){
        try{
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
            const apiaryData = await apiaryService.delete(id)
            return res.json(apiaryData)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new ApiaryController()