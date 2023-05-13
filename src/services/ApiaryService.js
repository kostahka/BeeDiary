import api from "../http";

export default class ApiaryService{
    static async addAllowedUser(apiaryId, userId){
        return await api.post('/apiary/addAllowedUser/' + apiaryId, {userId})
    }
    static async removeAllowedUser(apiaryId, userId){
        return await api.post('/apiary/removeAllowedUser/' + apiaryId, {userId})
    }
    static async fetchApiaries(user){
        return await api.get('/apiary/getAll/' + user?.nickname)
    }
    static async fetchUserOwnApiaries(userId){
        return await api.get('/apiary/getUserAll/' + userId)
    }
    static async addApiary(user, name){
        return await api.put('/apiary/add/' + user?.nickname, {name})
    }
    static async fetchApiary(id){
        return await api.get('/apiary/get/' + id)
    }
    static async setApiary(id, name){
        return await api.post('/apiary/set/' + id, {name})
    }
    static async deleteApiary(id){
        return await api.delete('/apiary/delete/' + id)
    }
}