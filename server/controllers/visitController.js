const Visit = require('../models/visits')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const getAll = async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const visits = await Visit.find({})
        .populate('visitors', 'name')
        .populate('district', 'name')
    res.status(201).json(visits)
}

const submitOne = async (req, res) => {
    const visit = req.body

    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const newVisit = new Visit({
        description: visit.description,
        district: visit.district,
        photoURL: visit.photoURL,
        visitors: [],
    })

    visit.visitors.forEach((id) => newVisit.visitors.push(id))

    const savedVisit = await newVisit.save()
    res.status(201).json(savedVisit)
}

module.exports = {
    getAll,
    submitOne,
}
