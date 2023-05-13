const {Schema} = require("mongoose");
module.exports = class ApiaryDto{
    _id;
    name;
    userId;
    allowedUsers;

    constructor(model) {
        this._id = model._id
        this.name = model.name
        this.userId = model.userId
        this.allowedUsers = model.allowedUsers ? model.allowedUsers : []
    }
}