const express = require('express')
const app = express.Router()
const user = require('../models/user')

//ikhwan
app.get('/',(req,res) => {
    res.send(user)
})
app.get('/register',(req,res) => {
    res.send("welcome")
})
app.get('/login',(req,res) => {
    res.send("welcome")
})
// winda

// 

//wildan

// 

//yanuar

//



module.exports = app