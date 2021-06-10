const Router = require('express')
const district = require('@controllers/districtController')
const images = require('@controllers/imageController')
const login = require('@controllers/loginController')
const users = require('@controllers/userController')
const visit = require('@controllers/visitController')

const router = Router()

// GET routes
router.get('/districts', district.getAll)
router.get('/imageupload', images.imageUploadURL)
router.get('/users', users.getAll)
router.get('/visit', visit.getAll)

// PUT routes
router.put('/districts/:id', district.updateOne)

// POST routes
router.post('/login', login.handleLogin)
router.post('/visit', visit.submitOne)

module.exports = router
