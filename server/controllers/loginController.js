const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const handleLogin = async (request, response) => {
    const body = request.body

    const user = await User.findOne({ name: body.name })
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(
                  body.password.toString(),
                  user.hashedPassword
              )

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password',
        })
    }

    const userForToken = {
        username: user.name,
        id: user._id,
    }

    // Token expiry time of 1 hour
    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
    })

    response.status(200).send({ token, name: user.name, id: user._id })
}

module.exports = {
    handleLogin,
}
