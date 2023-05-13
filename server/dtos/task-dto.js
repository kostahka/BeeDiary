const {Schema} = require("mongoose");
module.exports = class TaskDto{
    _id;
    text;
    isCompleted;
    hiveId;
    hiveNumber;

    constructor(model, hiveModel) {
        this._id = model._id
        this.text = model.text
        this.isCompleted = model.isCompleted
        this.hiveId = model.hiveId
        this.hiveNumber = hiveModel.number
    }
}