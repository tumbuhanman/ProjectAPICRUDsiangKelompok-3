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
    let nilai =0
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

    const datauser = users.length
    console.log(datauser);
    var index=0 
    let status =false
    while(index < users.length) {
        let email = users[index].email;
        let pass = users[index].password;
        // if(index == 1){
        //     console.log(req.body.email)
        //     console.log(email)

        //     console.log(req.body.password)
        //     console.log(pass)
        // }
        if(email == req.body.email && pass == req.body.password){
            status = true
            break
        }
        index++ 
    } 
    if(status) {
        res.send("login berhasil")
    }else{
        res.send("email dan password anda salah silahkan coba lagi")
    }
    // for (let index = 0; index < users.length; index++) {
    //     const email = users[index].email;
    //     const pass = users[index].password;
    //     if(index == 1){
    //         res.send(email,pass,req.body.email,req.body.password)
    //     }
    //     if(email == req.body.email && pass == req.body.password){
    //         res.send("login berhasil")
    //     }else{
    //         res.send('email atau password salah')
    //     }      
      
    // }
    
})

module.exports = app