// CRUD Friend
//     - `/friend (GET)`
//     - `/friend/:id (GET, with param for search by id)`
//     - `/friend (POST)`
//     - `/friend (PUT)`
//     - `/friend (DELETE)`

const express = require('express')
const app = express.Router()
const db = require('./dbFriends')//jangan lupa diganti
const { body, validationResult } = require('express-validator');
const regLetterAndSpace = /^[a-zA-Z\s]*$/;
const regLetterAndNumber = /^[a-z0-9]+$/i;


//method get in general 
app.get('/friends', function (req, res, next) {
    res.send(db);
})


//method get by Id
app.get('/friends/:id', function (req, res, next) {
    let id = Number(req.params.id); //number 
    // let id = req.params.id; //string

    const data = db.filter(x => x.id == id);
    if (data.length > 0) {
        res.send(data);
    }

    else {
        res.status(400).send("Data is undefined")
    }
})


//method post/send new data by structure in db 
app.post('/friends', (req, res) => {
    const { id, userId, name } = req.body
    if (id && userId && name && regLetterAndSpace.test(name) && regLetterAndNumber.test(userId)) { //db statis jadi id harus ditulis
        const data = db.filter(x => x.id == id);
        if (data.length > 0) { //ketika data sudah memiliki id yang sama berarti maka data sudah ada
            res.status(400).send("Data is already exist")
        }

        else { //ketika id belum ada yang sama
            db.push(req.body);
            res.send(req.body);
        }
    }

    else {
        res.status(400).send("Data is invalid, please make sure your input");
    }
})


//method put/update data with specific id
app.put('/friends/:id', (req, res) => {
    const { name } = req.body //bisa ditambah userId bila dibutuhkan
    const id = req.params.id

    //check apakah path berupa number atau bukan
    if (!Number(id)) {
        res.status(400).send("Please input parameter by number")
    }

    if (name && regLetterAndSpace.test(name)) {//mengubah nama, bisa ditambah userId jika diperlukan 
        const index = db.findIndex(x => x.id == id); //filter untuk mendapatkan data dengan id sesuai yang dicari 

        if (index >= 0) {
            // db[index].userId = userId;
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


//method delete/menghapus data dengan specific id
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
