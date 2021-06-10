const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const districts = require('./data/bdDistrict')
const users = require('./data/EmployeeList')

// Get password from cli
if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

const password = process.argv[2]

// Set URL here for your mongoDB Atlas database. Link will ideally look like below but might change depending on region
const url = `mongodb+srv://somestack:${password}@cluster0.enxcx.mongodb.net/SomeMap?retryWrites=true&w=majority`

// Set up connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

// Setting up Schemas
const userSchema = new mongoose.Schema({
    name: String,
    hashedPassword: String,
})

const districtSchema = new mongoose.Schema({
    name: String,
    id: String,
    path: String,
    visitCount: Number,
})

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

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.hashedPassword
    },
})

districtSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.dbID = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

// Setting up models
const User = mongoose.model('User', userSchema)
const District = mongoose.model('District', districtSchema)
const Visit = mongoose.model('Visit', visitSchema)

// Below functions to convert provided empID to hashes
const hashing = (id) => {
    const saltRounds = 10
    const hashedPwd = bcrypt.hashSync(id.toString(), saltRounds)
    return hashedPwd
}

const changeUser = (initialArray) => {
    const hashedArray = initialArray.map((user) => {
        user.hashedPassword = hashing(user.empID)
        delete user.empID
        return user
    })

    return hashedArray
}

// Running the conversion
const userList = changeUser(users.Employee)

// Create User and then District as main started database entries. Comment out either one as each has connection.close() on it
User.create(userList).then((result) => {
    console.log('User saved')
    mongoose.connection.close()
})

District.create(districts.District).then((result) => {
    console.log('District saved')
    mongoose.connection.close()
})
