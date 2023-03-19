import api from "../http";

export default class ApiaryService{
    static async fetchApiaries(user){
        return await api.get('/apiary/getAll/' + user?.nickname)
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