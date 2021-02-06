const express = require('express')
const app = express.Router()
const users = require('../models/dbUser.js')
const {cekRegister} = require('../validation')
const {validationResult} = require('express-validator')
const user = require('../models/user.js')

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
        id : Math.floor(Math.random() * 100),
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
    for (let index = 0; index < users.length; index++) {
        const email = users[index].email;
        const pass = users[index].password;
        if(email == req.body.email && pass == req.body.password){
            res.send("login berhasil")
        }else{
            res.send('email atau password salah')
        }      
      
    }
    
})
// winda

// 

//wildan

// 

//yanuar

//



module.exports = app