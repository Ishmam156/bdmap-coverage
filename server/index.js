require('dotenv').config()
const errorMiddleware = require('@middleware/errorMiddleware')
const express = require('express')
const mongoose = require('mongoose')
const routes = require('@util/routes')

const app = express()

// Checking if app is in development mode
const url =
    process.env.NODE_ENV === 'development'
        ? process.env.MONGODB_URI_TEST
        : process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((result) => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(express.json())

app.use(routes)

app.use(errorMiddleware)

module.exports = app
