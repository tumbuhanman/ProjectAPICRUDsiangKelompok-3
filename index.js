const express = require('express')
const app = express()
//built in middleware
app.use(express.json())


const itemRoute = require('./friendsRoute')
app.use(itemRoute)

//error handle in middleware 
app.use(function (error, req, res, next) {
    //console.log(error)
    res.status(500).send(error.message)
})

const port = 3000
app.listen(port, () => {

    console.log(`Listening on http://localhost:${port}`);
})

