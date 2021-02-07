const express = require('express')
const app = express.Router()
const transactionDB = require('../models/dbTransaction')

function getId(param) {
    const id = transactionDB.find(id => id.id === param)
    return id
}

function getTransactionIndex(param) {
    const TransactionIndex = transactionDB.findIndex(TransactionIndex => TransactionIndex.id === param)
    return TransactionIndex
}

function getUserId(param) {
    const UserId = transactionDB.filter(UserId => UserId.userId === param)
    return UserId
}

// TRANSACTION GET
app.get('/transaction', (req,res) => {
    res.send(transactionDB)
})

// TRANSACTION GET by ID
app.get('/transaction/:id', (req,res) => {
    const idparam = req.params.id
    const id = getId(idparam)
    if (!id) {
        res.send("Data tidak ditemukan")
    } else {
        res.send(id)
    }
})

//TRANSACTION POST
app.post('/transaction', (req, res) => {
    const { id, userId } = req.body

    if (getId(id)) {
        res.status(400).send("Terdapat data dengan ID yang sama pada Basisdata")
    } else if (getUserId(userId).length == 0) {
        res.status(400).send("Tidak ditemukan userId yang sama pada Basisdata")
    } else {
        transactionDB.push(req.body)
        res.send(req.body)
    }
})

// TRANSACTION PUT
app.put('/transaction/:id', (req, res) => {
    const idparam = req.params.id
    const {userId} = req.body
    if (!getId(idparam)) {
        res.status(400).send("Gagal. Tidak ditemukan Id Transaksi yang sama pada Basisdata")
    } else if (getUserId(userId).length == 0) {
        res.status(400).send("Gagal. Tidak ditemukan userId yang sama pada Basisdata")
    } else {
        transactionDB[getTransactionIndex(idparam)] = req.body
        res.send(req.body)
    }
})

//TRANSACTION DELETE
app.delete('/transaction/:id', (req, res) => {
    const idparam = req.params.id
    const deletedItem = transactionDB.splice(getTransactionIndex(idparam), 1)
    res.send(deletedItem)
})

module.exports = app