const express = require('express')
const router = express.Router()
const blog = require('../model/blog')
const app = express()
const path = require('path')
const { updateOne } = require('../model/blog')

app.use(express.json())



module.exports = router