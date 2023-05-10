import api from "../http";

export default class TaskService{
    static async addTask(hiveId, text){
        return await api.put('/task/add/' + hiveId)
    }
    static async fetchApiaryTasks(apiaryId){
        return await api.get('/task/getApiaryAll/' + apiaryId)
    }
    static async fetchTasks(hiveId){
        return await api.get('/task/getAll/' + hiveId)
    }
    static async fetchTask(id){
        return await api.get('/users/get/' + id)
    }
    static async setTask(id, text){
        return await api.post('/task/set/' + id ,{text})
    }
    static async setTaskCompletion(id, complete){
        return await api.post('/task/setCompletion/' + id ,{complete})
    }
    static async deleteTask(id){
        return await api.delete('/task/delete/' + id)
    }
}