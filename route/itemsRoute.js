const express = require('express')
const app = express.Router()
const items = require('../models/dbItem')
const users = require('../models/dbUser')

function getItem(param) {
    const item = items.find(item => item.id === param)
    return item
}

function getItemIndex(param) {
    const index = items.findIndex(item => item.id === param)
    return index
}

function getUserId(param) {
    const user = users.filter(user => user.id === param)
    return user
}

function dbStructure(a, b, c) {
    return {
        id: a,
        userId: b,
        name: c
    }
}

app.get('/item', (req, res) => {
    res.send(items)
})

app.get('/item/:id', (req, res) => {
    const param = req.params.id

    if (getItem(param)) {
        res.send(getItem(param))
    }

    else {
        res.status(400).send("ID not found")
    }
})

app.post('/item', (req, res) => {
    const { id, userId, name } = req.body

    if (getItem(id)) {
        res.status(400).send("There is similar Id, please change the input value")
    }

    else if (getUserId(userId).length == 0) {
        res.status(400).send("There is no similar userId, please change the input value")
    }

    else {
        if (id && userId && name) {
            items.push(dbStructure(id, userId, name))
            res.send(dbStructure(id, userId, name))
        }

        else {
            res.status(400).send("Please check your input")
        }
    }
})

app.put('/item/:id', (req, res) => {
    const param = req.params.id
    const { userId, name } = req.body

    if (getItem(param)) {
        if (getUserId(userId).length == 0) {
            res.status(400).send("There is no similar userId, please change the input value")
        }

        else {
            if (userId && name) {
                items[getItemIndex(param)] = dbStructure(param, userId, name)
                res.send(dbStructure(param, userId, name))
            }

            else {
                res.status(400).send("Please check your input")
            }
        }
    }

    else {
        res.status(400).send("ID not found")
    }
})

app.delete('/item/:id', (req, res) => {
    const param = req.params.id

    if (getItem(param)) {
        const deletedItem = items.splice(getItemIndex(param), 1)
        res.send(deletedItem)
    }

    else {
        res.status(400).send("ID not found")
    }
})

module.exports = app