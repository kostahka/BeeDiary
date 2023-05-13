import api from "../http";

export default class GroupService{
    static async removeAllowedApiary(apiaryId, groupId){
        return await api.post('/group/removeAllowedApiary', { apiaryId, groupId})
    }
    static async addAllowedApiary(apiaryId, groupId){
        return await api.post('/group/addAllowedApiary', { apiaryId, groupId})
    }
    static async removeUser(userId, groupId){
        return await api.post('/group/removeUser', { userId, groupId})
    }
    static async addUser(userId, groupId){
        return await api.post('/group/addUser', { userId, groupId})
    }
    static async fetchGroup(id){
        return await api.get('/group/get/' + id)
    }
    static async fetchUserGroups(userId){
        return await api.get('/group/getAll/' + userId)
    }
    static async fetchUserOwnGroups(userId){
        return await api.get('/group/getUserAll/' + userId)
    }
    static async setGroup(id, name){
        return await api.post('/group/set/' + id ,{name})
    }
    static async addGroup(userId, name){
        return await api.put('/group/add/' + userId, {name})
    }
    static async deleteGroup(id){
        return await api.delete('/group/delete/' + id)
    }
}