const express = require("express");
const router = express.Router();
const { Nuxt, Builder } = require('nuxt');
const app = express();
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const users = require('../model/users')
const bcrypt = require('bcrypt')

app.use(express.json());
app.use(cookieParser());
async function generatePasswordHash(plainPassword) {
    return await bcrypt.hash(plainPassword, 12)
}
async function CreateUser(login, password) {
    return await users.create({ login, password })
        .then((data) => {
            return data
        }).catch((error) => {
            throw error
        })
}
async function comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}
async function GetUser(login) {
    return await users.findOne({ login })
        .then((data) => {
            return data
        }).catch((error) => {
            throw error
        })
}
//app.use(
//    jwt({
//        secret: process.env.TOKEN,
//        algorithms: ["HS256"],
//    }).unless({
//        path: '/api/auth/login'
//    })
//)

router.post("/login", async (req, res, done) => {
    const userl= await users.findOne({ login: req.body.user })
    .then((data) => {
            
           return data
       }).catch((error) => {
            throw error
        })
    if (!userl.login && !userl.password) {
        await res.status(403).json({ message: 'Ошибка авторизации' });
    }
    const validation = await comparePasswords(req.body.password, userl.password)
    
   if (userl._id && validation) {
   
        await jsonwebtoken.sign({ user: req.body.user }, "secret", async function (err, token) {
            await res.json({ token: token, user: req.body.user, id: req.body._id });
        })
        console.log(req.body)
    }
    else {
        await res.status(403).json({ message: 'Ошибка авторизации' });
    }
   
});
router.post('/register', async (req, res) => {
    const password = req.body.password
    const login = req.body.login
    const hashedPassword = await generatePasswordHash(password)
    await CreateUser(login, hashedPassword)

        .then(() => {
            res.send({ message: 'Аккаунт создан' })
        }).catch((err) => {
            throw err
        })
})


router.post("/logout", (req, res) => {
    res.json("Вы успешно вышли");
});

router.get('/user', async (req, res) => {
    const razdelit = req.headers.authorization.split('Bearer ')[1]
    const token = jsonwebtoken.decode(razdelit);
    res.json({ user: token.user  });

});
router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    const userfull= await users.findOne({ login: req.params.id }).select('_id login admin')
    res.json(userfull)
});

module.exports = router;

