const {Schema, model} = require("mongoose")

const GroupSchema = new Schema({
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    allowedApiaries: [{type: Schema.Types.ObjectId, ref: 'Apiary'}],
})

module.exports = model('Group', GroupSchema);