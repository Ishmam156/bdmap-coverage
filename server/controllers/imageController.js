const aws = require('aws-sdk')
require('dotenv').config()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const randomBytes = promisify(crypto.randomBytes)
// AWS S3 Bucket region
const region = ''
// AWS S3 Bucket Name
const bucketName = ''
// // AWS S3 Access ID from .env file
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// // AWS S3 Secret Access Key from .env file
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4',
})

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const generateUploadURL = async () => {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60 * 5,
    }

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

const imageUploadURL = async (req, res) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const url = await generateUploadURL()
    res.send({ url })
}

module.exports = {
    imageUploadURL,
}
