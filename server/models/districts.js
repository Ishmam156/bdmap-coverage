const mongoose = require('mongoose')

const districtSchema = new mongoose.Schema({
    name: String,
    id: String,
    path: String,
    visitCount: Number,
})

districtSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.dbID = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('District', districtSchema)
