const {Schema, model} = require("mongoose")

const ApiarySchema = new Schema({
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    allowedUsers: [{type: Schema.Types.ObjectId, ref:'User'}]
})

module.exports = model('Apiary', ApiarySchema);