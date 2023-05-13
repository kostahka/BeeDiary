module.exports = class UserDto{
    nickname;
    id;
    isAdmin;
    groups;
    allowedApiaries;

    constructor(model) {
        this.nickname = model.nickname
        this.id = model._id
        this.isAdmin = model.isAdmin
        this.groups = model.groups ? model.groups : []
        this.allowedApiaries = model.allowedApiaries ? model.allowedApiaries : []
    }
}