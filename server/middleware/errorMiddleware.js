const errorHandler = (error, req, res, next) => {
    console.error(error.message, error.name, error.extra)

    if (error.name === 'ApplicationError') {
        return res.status(error.status).send({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token',
        })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'token expired',
        })
    }

    res.status(500).send({ error: error.message })
    return next(error)
}

module.exports = errorHandler
