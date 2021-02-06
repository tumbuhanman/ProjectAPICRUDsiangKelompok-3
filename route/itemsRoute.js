const express = require('express')
const app = express.Router()
const items = require('../models/dbItem')

function getItem(param) {
    const item = items.find(item => item.id === param)
    return item
}

function getItemIndex(param) {
    const index = items.findIndex(item => item.id === param)
    return index
}

app.get('/item', (req, res) => {
    res.send(items)
})

app.get('/item/:id', (req, res) => {
    const id = req.params.id

    if (getItem(id)) {
        res.send(getItem(id))
    }

    else {
        res.status(400).send("ID not found")
    }
})

app.post('/item', (req, res) => {
    const data = req.body
    const id = data.id

    if (getItem(id)) {
        res.status(400).send("There is similar Id, please change")
    }

    else if (Object.keys(data).length === 0) {
        res.status(400).send("Please write something")
    }

    else {
        items.push(data)
        res.send(data)
    }
})

app.put('/item/:id', (req, res) => {
    const id = req.params.id
    const data = req.body

    if (getItem(id)) {
        if (Object.keys(data).length === 0) {
            res.status(400).send("Please write something")
        }

        else {
            items[getItemIndex(id)] = data
            res.send(data)
        }
    }

    else {
        res.status(400).send("ID not found")
    }
})

app.delete('/item/:id', (req, res) => {
    const id = req.params.id

    if (getItem(id)) {
        const deletedItem = items.splice(getItemIndex(id), 1)
        res.send(deletedItem)
    }

    else {
        res.status(400).send("ID not found")
    }
})

module.exports = app