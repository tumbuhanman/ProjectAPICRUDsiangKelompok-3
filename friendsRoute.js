// CRUD Friend
//     - `/friend (GET)`
//     - `/friend/:id (GET, with param for search by id)`
//     - `/friend (POST)`
//     - `/friend (PUT)`
//     - `/friend (DELETE)`


const express = require('express')
const app = express.Router()
const db = require('./db')//jangan lupa diganti

//method get/request to show the data 
app.get('/item', (req, res) => {
    res.send(db)
})

//method post/send new data 
app.post('/item', (req, res) => {
    const index = req.paramas.index
    db.push(req.body)
    res.send(req.body)
})

//method put/update data with specific id, cara manggilnya localhost:3000/item/0-dst
app.put('/item/:index', (req, res) => {
    const index = req.params.index
    if (!Number(index)) {
        res.status(400).send("Please input parameter by number")
    }

    else if ((db.length - 1) < Number(index)) { //bisa menambah karena itemsnya dihitung dari 1
        res.status(400).send("Please input parameters with a number less than the current last sequence or the current last sequence")
    }

    else {
        db[req.params.index] = req.body
        res.send(req.body)
    }

})

//method delete/menghapus data dengan specific id, cara manggilnya localhost:3000/item/0-dst
app.delete('/item/:index', (req, res) => {
    const deleteItem = db.splice(req.params.index, 1)
    res.send(deleteItem)
})

app.get('/error', (req, res) => {
    testing
})

module.exports = app
