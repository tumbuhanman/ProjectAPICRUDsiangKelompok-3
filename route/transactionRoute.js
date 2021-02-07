const express = require('express')
const app = express.Router()
const userDB = require('../models/dbUser')
const friendDB = require('../models/dbFriend')
const itemDB = require('../models/dbItem')
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
    const user = userDB.filter(user => user.id === param)
    return user
}

function getFriendId(param) {
    const friend = friendDB.filter(friend => friend.id === param)
    return friend
}

function getItemId(param) {
    const item = itemDB.filter(item => item.id === param)
    return item
}

// TRANSACTION GET
app.get('/transaction', (req,res) => {
    res.send(transactionDB)
})

// TRANSACTION GET by ID
app.get('/transaction/:id', (req,res) => {
    const param = req.params.id
    if (!getId(param)) {
        res.status(404).send("Data tidak ditemukan")
    } else {
        res.send(getId(param))
    }
})

//TRANSACTION POST
app.post('/transaction', (req, res) => {
    const { id, userId, friendId, itemId } = req.body

    if (getId(id)) {
        res.status(400).send("Gagal. Terdapat transaksi dengan ID yang sama pada Basisdata")
    } else if (getUserId(userId).length == 0) {
        res.status(400).send("Gagal. UserID tidak ditemukan pada Basisdata")
    } else if (getFriendId(friendId).length == 0) {
        res.status(400).send("Gagal. FriendID tidak ditemukan pada Basisdata")
    } else if (getItemId(itemId).length == 0) {
        res.status(400).send("Gagal. ItemID tidak ditemukan pada Basisdata")
    } else {
        transactionDB.push(req.body)
        res.send(req.body)
    }
})

// TRANSACTION PUT
app.put('/transaction', (req, res) => {
    const { id, userId, friendId, itemId } = req.body
    if (!getId(id)) {
        res.status(400).send("Gagal. Tidak ditemukan Id Transaksi yang sama pada Basisdata")
    } else if (getUserId(userId).length == 0) {
        res.status(400).send("Gagal. UserID tidak ditemukan pada Basisdata")
    } else if (getFriendId(friendId).length == 0) {
        res.status(400).send("Gagal. FriendID tidak ditemukan pada Basisdata")
    } else if (getItemId(itemId).length == 0) {
        res.status(400).send("Gagal. ItemID tidak ditemukan pada Basisdata")
    } else {
        transactionDB[getTransactionIndex(id)] = req.body
        res.send(req.body)
    }
})

//TRANSACTION DELETE
app.delete('/transaction/:id', (req, res) => {
    const param = req.params.id
    if (getId(param)) {
        const deletedItem = transactionDB.splice((getId(param)), 1)
        res.send(deletedItem)
    } else {
        res.send('Gagal. ID tidak ditemukan')
    }
})

module.exports = app