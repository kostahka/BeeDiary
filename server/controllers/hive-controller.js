const hiveService = require('../service/hive-service')
const apiaryService = require("../service/apiary-service");

class HiveController{
    async getHive(req, res, next){
        try{
            const {id} = req.params
            const hive = await hiveService.get(id)
            return res.json(hive)
        }catch (e){
            next(e)
        }
    }
    async setHive(req, res, next){
        try{
            const {hive} = req.body
            const hiveData = await hiveService.set(hive)
            return res.json(hiveData)
        }catch (e){
            next(e)
        }
    }
    async addHives(req, res, next){
        try{
            const {id} = req.params
            const {count} = req.body
            const hive = await hiveService.add(id, count)
            return res.json(hive)
        }catch (e){
            next(e)
        }
    }
    async deleteHive(req, res, next){
        try{
            const {id} = req.params
            const ownUserId = req.user.id;
            const hiveData = await hiveService.delete(ownUserId, id)
            return res.json(hiveData)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new HiveController()