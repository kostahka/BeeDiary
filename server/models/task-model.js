const {Schema, model} = require("mongoose")

const TaskSchema = new Schema({
    text: {type: String, required: true},
    isCompleted: {type: Boolean, required: true},
    hiveId: {type: Schema.Types.ObjectId, ref: 'Hive', required: true},
})

module.exports = model('Task', TaskSchema);