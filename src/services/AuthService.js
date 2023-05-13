import api from "../http/index"

export default class AuthService{
    static async login(nickname, password){
        const userData = await api.post('/users/login', {nickname, password})
        localStorage.setItem('accessToken', userData.data.accessToken)
        return userData.data.user
    }
    static async registration(nickname, password, isAdmin){
        const userData = await api.post('/users/registration', {nickname, password, isAdmin})
        localStorage.setItem('accessToken', userData.data.accessToken)
        return userData.data.user
    }
    static async logout(){
        localStorage.removeItem('accessToken')
        return api.post('/users/logout')
    }
}