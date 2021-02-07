const express = require('express')
const app = express()
const route = require('./route/route')
const transaction = require('./route/transactionRoute')
const item = require('./route/itemsRoute')
const port = 3000

app.use(express.json())
app.use(route, transaction)
// app.use(function(error,req,res,next) {
//     console.log(error)
//     res.status(500).send(error,message)
// })
app.listen(port, () => {
  console.log(`Server on at http://localhost:${port}`)
})