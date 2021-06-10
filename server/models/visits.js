const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    description: String,
    photoURL: String,
    visitors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
    },
})

visitSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Visit', visitSchema)
