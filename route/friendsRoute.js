// CRUD Friend
//     - `/friend (GET)`
//     - `/friend/:id (GET, with param for search by id)`
//     - `/friend (POST)`
//     - `/friend (PUT)`
//     - `/friend (DELETE)`

const express = require('express')
const app = express.Router()
const db = require('../models/dbFriend')//jangan lupa diganti
const dbUsers = require('../models/dbUser')//jangan lupa diganti
const { body, validationResult } = require('express-validator');
const regLetterAndSpace = /^[a-zA-Z\s]*$/;
const regLetterAndNumber = /^[a-z0-9]+$/i;


//method get only same data in dbUser and dbFriend
app.get('/friends/all', function (req, res, next) {
    var array = []
    for (var friends of db) {
        const index = dbUsers.findIndex(x => x.id == friends.userId); //filter untuk mendapatkan data dengan id sesuai yang dicari 

        if (index >= 0) { //cek apabila ada yang sama maka akan di tampilkan jika tidak maka akan disimpan ke array
            var object = { //mapping data baru sebagai object, definisi values
                id: friends.id,
                userId: dbUsers[index].id,
                name: friends.name,
                username: dbUsers[index].username,
                email: dbUsers[index].email,
                password: dbUsers[index].password
            }
            array.push(object) //push ke dalam array
        }
    }
    res.send(array);
})


//method get data only in dbFriend
app.get('/friends', function (req, res, next) {
    if (db.length == 0) {
        res.send("Data is empty")
    }

    else {
        res.send(db);
    }
})


//method get data only in dbFriend by Id 
app.get('/friends/:id', function (req, res, next) {
    //let id = Number(req.params.id); //number 
    let id = req.params.idFriends; //string

    if (!Number(id)) {
        res.status(400).send("Please input parameter by number")
    }

    const data = db.filter(x => x.id == id);
    if (data.length > 0) {
        res.send(data);
    }

    else {
        res.status(400).send("Data is undefined")
    }
})


//method get data only by Id dbUser
app.get('/friends/all/:id', function (req, res, next) {
    const id = req.params.id
    if (!Number(id)) {
        res.status(400).send("Please input parameter by number")
    }

    const friendsIndex = db.findIndex(x => x.id == id);
    if (friendsIndex >= 0) {

        const usersIndex = dbUsers.findIndex(x => x.id == db[friendsIndex].userId); //filter untuk mendapatkan data dengan id sesuai yang dicari 

        if (usersIndex >= 0) { //cek apabila ada yang sama maka akan di tampilkan jika tidak maka akan disimpan ke array
            var object = { //mapping data baru sebagai object, definisi values
                id: db[friendsIndex].id,
                userId: dbUsers[usersIndex].id,
                name: db[friendsIndex].name,
                username: dbUsers[usersIndex].username,
                email: dbUsers[usersIndex].email,
                password: dbUsers[usersIndex].password
            }
            res.send(object);
        }

        else {
            res.send("Data not found")
        }
    }

    else {
        res.send("Data not found")
    }
})


//method post/send new data by structure in dbFriend by random Id
app.post('/friends', (req, res) => {
    const { userId, name } = req.body
    var id = Math.floor(Math.random() * 100);
    // var id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    if (userId && name && Number(userId) && regLetterAndSpace.test(name)) { //db statis jadi id harus ditulis
        const data = db.filter(x => x.id == id.toString());

        if (data.length > 0) { //ketika data sudah memiliki id yang sama berarti maka data sudah ada
            res.status(400).send("Id is already exist")
        }

        const dataUserId = db.filter(x => x.userId == userId)
        if (dataUserId.length == 0) {
            res.status(400).send("UserId unavailable")
        }

        else { //ketika id belum ada yang sama dan mengubah ke random id
            var object = {
                id: id.toString(),
                userId: userId,
                name: name
            }
            db.push(object);
            res.send(req.body);
        }
    }

    else {
        res.status(400).send("Data is invalid, please make sure your input");
    }
})


//method put/update data with specific idFriend
app.put('/friends/:id', (req, res) => {
    const { name } = req.body //bisa ditambah userId bila dibutuhkan make koma 
    //const { name } = req.body //bisa ditambah userId bila dibutuhkan make koma 
    const id = req.params.id

    //check apakah path berupa number atau bukan
    if (!Number(id)) {
        res.status(400).send("Please input parameter by number")
    }

    if (name && regLetterAndSpace.test(name)) {//mengubah nama dan angka bisa ditambah userId jika diperlukan 
        const index = db.findIndex(x => x.id == id); //filter untuk mendapatkan data dengan id sesuai yang dicari 

        if (index >= 0) {
            //db[index].id = id;
            db[index].name = name;
            res.send(db[index])
        }

        else {
            res.status(400).send("Data is undefined")
        }
    }

    else {
        res.status(400).send("Data is invalid")
    }
})


//method delete/menghapus data dengan specific idFriend
app.delete('/friends/:id', (req, res) => {
    let id = req.params.id; //number
    //check apakah path berupa number atau bukan
    if (!Number(id)) {
        res.status(400).send("Please input parameter by number")
    }

    const index = db.findIndex(x => x.id == id); //filter untuk mendapatkan data dengan id sesuai yang dicari 
    if (index >= 0) {
        const deleteItem = db.splice(index, 1)
        res.send(deleteItem)
    }

    else {
        res.status(400).send("Data is undefined")
    }
})


app.get('/error', (req, res) => {
    res.send("Error Handling")
})

module.exports = app
