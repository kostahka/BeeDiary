import api from "../http";

export default class HiveService{
    static async fetchHive(id){
        return await api.get('/hive/get/' + id)
    }
    static async addHives(id, count){
        return await api.post('/hive/add/' + id, {count})
    }
    static async setHive(hive){
        return await api.post('/hive/set', {hive})
    }
    static async deleteHive(id){
        return await api.post('/hive/delete/' + id)
    }
}