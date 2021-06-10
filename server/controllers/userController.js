const User = require('../models/users')

const getAll = async (req, res) => {
    const users = await User.find({})
    res.send(users)
}

module.exports = {
    getAll,
}
