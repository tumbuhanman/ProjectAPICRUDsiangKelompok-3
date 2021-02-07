const express = require('express')
const app = express.Router()
const userDB = require('../models/dbUser')
const friendDB = require('../models/dbFriend')
const itemDB = require('../models/dbItem')
const transactionDB = require('../models/dbTransaction')
const e = require('express')


// FUNCTION 
// Fungsi mencari ID pada database Transaction
function getId(param) {
    const id = transactionDB.find(id => id.id === param)
    return id
}

function getTransactionIndex(param) {
    const TransactionIndex = transactionDB.findIndex(TransactionIndex => TransactionIndex.id === param)
    return TransactionIndex
}

// Fungsi mencari ID pada database User
function getUserId(param) {
    const user = userDB.filter(user => user.id === param)
    return user
}

// Fungsi mencari ID pada database Transaction
function getFriendId(param) {
    const friend = friendDB.filter(friend => friend.id === param)
    return friend
}

// Fungsi mencari ID pada database Item
function getItemId(param) {
    const item = itemDB.filter(item => item.id === param)
    return item
}

function dbStructure(a, b, c, d, e) {
    return {
        id: a,
        userId: b,
        friendId: c,
        itemId: d,
        nominal: e
    }
}

// TRANSACTION GET
// menampilkan isi basisdata Transaction
app.get('/transaction', (req,res) => {
    res.send(transactionDB)
})

// TRANSACTION GET by ID
// menampilkan isi basisdata Transaction berdasarkan ID yang dimasukkan
app.get('/transaction/:id', (req,res) => {
    const param = req.params.id
    if (!getId(param)) {
        res.status(404).send("Data tidak ditemukan")
    } else {
        res.send(getId(param))
    }
})

// TRANSACTION POST
// menambahkan object baru
app.post('/transaction', (req, res) => {
    const { id, userId, friendId, itemId, nominal } = req.body

    if (getId(id)) {
        res.status(400).send("Gagal. Terdapat transaksi dengan ID yang sama pada Basisdata")
    } else if (getUserId(userId).length == 0) {
        res.status(400).send("Gagal. UserID tidak ditemukan pada Basisdata")
    } else if (getFriendId(friendId).length == 0) {
        res.status(400).send("Gagal. FriendID tidak ditemukan pada Basisdata")
    } else if (getItemId(itemId).length == 0) {
        res.status(400).send("Gagal. ItemID tidak ditemukan pada Basisdata")
    } else if (typeof nominal !== 'number') {
        res.status(400).send("Gagal. Nominal bukan merupakan angka")
    } else {
        if (id && userId && friendId && itemId && nominal) {
            transactionDB.push(dbStructure(id, userId, friendId, itemId, nominal))
            res.send(dbStructure(id, userId, friendId, itemId, nominal))
        }

        else {
            res.status(400).send("Please check your input")
        }
    }
})

// TRANSACTION PUT
app.put('/transaction', (req, res) => {
    const { id, userId, friendId, itemId, nominal } = req.body
    if (!getId(id)) {
        res.status(400).send("Gagal. Tidak ditemukan Id Transaksi yang sama pada Basisdata")
    } else if (getUserId(userId).length == 0) {
        res.status(400).send("Gagal. UserID tidak ditemukan pada Basisdata")
    } else if (getFriendId(friendId).length == 0) {
        res.status(400).send("Gagal. FriendID tidak ditemukan pada Basisdata")
    } else if (getItemId(itemId).length == 0) {
        res.status(400).send("Gagal. ItemID tidak ditemukan pada Basisdata")
    } else if (typeof nominal !== 'number') {
        res.status(400).send("Gagal. Nominal bukan merupakan angka")
    } else {
        if (id && userId && friendId && itemId && nominal) {
            transactionDB.push(dbStructure(id, userId, friendId, itemId, nominal))
            res.send(dbStructure(id, userId, friendId, itemId, nominal))
        }

        else {
            res.status(400).send("Please check your input")
        }
    }
})

//TRANSACTION DELETE
app.delete('/transaction', (req, res) => {
    const { id } = req.body
    if (getId(id)) {
        const deletedItem = transactionDB.splice((getId(id)), 1)
        res.send(deletedItem)
    } else {
        res.send('Gagal. Data tidak ditemukan')
    }
})

module.exports = app