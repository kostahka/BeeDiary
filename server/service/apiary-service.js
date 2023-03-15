const apiaryModel = require('../models/apiary-model')

class ApiaryService{
    async getAll(userId){
        const apiaries = await apiaryModel.find({user_id: userId})
        return apiaries
    }
}

module.exports = new ApiaryService()