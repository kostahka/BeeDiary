const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-exception')
const groupModel = require('../models/group-model')

class UserService{
    async removeAllowedApiary(userId, apiaryId){
        const user = await UserModel.findById({userId})
        if(!user){
            throw ApiError.BadRequest('No such user')
        }
        
        const userData = await UserModel.findByIdAndUpdate(userId, {$addToSet: {allowedApiaries: apiaryId}});
        return userData
    }
    async addAllowedApiary(userId, apiaryId){
        const user = await UserModel.findById({userId})
        if(!user){
            throw ApiError.BadRequest('No such user')
        }

        const userData = await UserModel.findByIdAndUpdate(userId, {$addToSet: {allowedApiaries: apiaryId}});
        return userData
    }
    async getGroupUsers(groupId){
        const groupData = await groupModel.findById(groupId)

        let users = []
        for(const userId of groupData.users){
            const userData = await UserModel.findById(userId)
            users.push(new UserDto(userData))
        }

        const user = await UserModel.findById(groupData.userId)
        users = [...users, new UserDto(user)]
        return users;
    }
    async getUser(id){
        const user = await UserModel.findOne({_id: id})
        return new UserDto(user);
    }
    async getUsersCount(nicknameFilter){
        const count = await UserModel.count({nickname: {$regex:nicknameFilter}});
        return count;
    }
    async getUsers(nicknameFilter, page, inPageCount){
        nicknameFilter = nicknameFilter? nicknameFilter : "";
        const users = await UserModel.find({nickname: {$regex:nicknameFilter}}).skip((page - 1) * inPageCount).limit(inPageCount);
        return users.map(u => new UserDto(u))
    }

    async registration(nickname, password, isAdmin){
        const candidate = await UserModel.findOne({nickname})
        if(candidate){
            throw ApiError.BadRequest('User with nickname ' + nickname + ' is already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await UserModel.create({nickname, password: hashPassword, isAdmin})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return{
            ...tokens,
            user: userDto
        }
    }
    async login(nickname, password){
        const user = await UserModel.findOne({nickname})
        if(!user){
            throw ApiError.BadRequest('No user with such nickname')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Incorrect password')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return{
            ...tokens,
            user: userDto
        }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validationRefreshToken(refreshToken)
        const tokenData = await tokenService.findToken(refreshToken)
        if(!userData || !tokenData){
            return ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return{
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()