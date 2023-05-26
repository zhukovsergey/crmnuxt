const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const mongoose = require('mongoose')
const config = require('../nuxt.config.js')
mongoose.Schema.Types.Boolean.convertToFalse.add('')
const bodyParser = require('body-parser')
require('dotenv').config()
const blog = require('./model/blog')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

async function main() {
 
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/api");
    }
    catch(err) {
        return console.log(err);
    }
}



app.use(bodyParser.json())
app.use(express.json())



const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

app.use('/blog', blogRoutes)
app.use('/auth', authRoutes)


config.dev = process.env.NODE_ENV !== 'production'
async function start() {
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server
    await nuxt.ready()
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }
    app.use(nuxt.render)
    app.listen(port, host)
    consola.ready({
        message: 'Server listening on http://${host}:${port}',
        badge: true
    })
}
start()
main();
module.exports = {
    path: '/api',
    handler: app
}