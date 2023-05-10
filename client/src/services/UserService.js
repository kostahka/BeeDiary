import api from "../http";

export default class UserService{
    static async fetchUser(id){
        return await api.get('/users/get/' + id)
    }
    static async fetchUsers(nicknameFilter, page, inPageCount){
        return await api.get('/users/getAll', {params:{nicknameFilter, page, inPageCount}})
    }
    static async fetchUsersCount(nicknameFilter){
        return await api.get('/users/getCount' ,{params:{nicknameFilter}})
    }
}