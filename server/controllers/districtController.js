const District = require('../models/districts')

const getAll = async (req, res) => {
    const districts = await District.find({})
    res.send(districts)
}

const updateOne = async (req, res) => {
    const district = await District.findById(req.params.id)
    district.visitCount = district.visitCount + 1
    await district.save()
    res.send(district)
}

module.exports = {
    getAll,
    updateOne,
}
