const {Schema} = require("mongoose");
module.exports = class GroupDto{
    _id;
    name;
    userId;
    users;
    allowedApiaries;

    constructor(model) {
        this._id = model._id
        this.name = model.name
        this.userId = model.userId
        this.users = model.users
        this.allowedApiaries = model.allowedApiaries
    }
}