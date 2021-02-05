const express = require('express')
const app = express.Router()
const transactionDB = require('../models/transactionDB')

app.get('/',(req,res) => {
    res.send("welcome")
})

// TRANSACTION GET
app.get('/transaction', (req,res) => {
    res.send(transactionDB)
})

// TRANSACTION GET by ID
app.get('/transaction/:id', (req,res) => {
    const id = req.params.id
    if (!Number(id)) {
        res.status(400).send("ID yang anda masukkan tidak sesuai standar")
    } else if ((transactionDB.length) < Number(id)) {
        res.status(404).send("Data tidak ditemukan")
    } else {
        res.send(transactionDB[(Number(id))-1])
    }
})

// TRANSACTION POST
app.post('/transaction', (req, res) => {
    transactionDB.push(req.body)
    res.send(req.body)
})

// TRANSACTION PUT
app.put('/transaction/:id', (req, res) => {
    const id = req.params.id
    if (!Number(id)) {
        res.status(400).send("ID yang anda masukkan tidak sesuai standar")
    } else if ((transactionDB.length) < Number(id)) {
        res.status(404).send("Data tidak ditemukan")
    } else {
        transactionDB[Number(id)-1] = req.body
        res.send(req.body)
    }
})

//TRANSACTION DELETE
app.delete('/transaction/:id', (req, res) => {
    const id = req.params.id
    const deletedItem = transactionDB.splice((Number(id)-1), 1)
    res.send(deletedItem)
})

module.exports = app