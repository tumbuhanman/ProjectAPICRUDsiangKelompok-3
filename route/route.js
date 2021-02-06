const express = require('express')
const app = express.Router()
const users = require('../models/user.js')
const {cekRegister} = require('../validation')
const {validationResult} = require('express-validator')

//ikhwan
app.get('/',(req,res) => {
    res.send(users)
})
app.post('/register',cekRegister,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
          status: false,
          message: errors.array()[0].msg
      })  
    }
    const register = {
        id : req.body.id,
        username: req.body.username,
        email : req.body.email,
        password: req.body.password
    }
    users.push(register)
    res.status(200).json({
        message : "berhasil registrasi",
    })
})
app.post('/login',(req,res) => {
    res.send(users)
})
// winda

// 

//wildan

// 

//yanuar

//



module.exports = app