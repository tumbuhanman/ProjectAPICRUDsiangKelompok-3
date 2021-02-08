const express = require('express')
const app = express()
const route = require('./route/route')
const transaction = require('./route/transactionRoute')
const item = require('./route/itemsRoute')
const friends = require('./route/friendsRoute')
const port = 3000

app.use(express.json())
app.use(route, transaction, item, friends)

app.use(function (error, req, res, next) {
  res.status(500).send("Error : ", error.message)
})

app.listen(port, () => {
  console.log(`Server on at http://localhost:${port}`)
})