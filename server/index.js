/* 
This is our node express server
It runs on server 3000
It also establishes the routes we will follow to access specific endpoints
This is the server that we make requests *to* from our axios http request in services/Eventservices.js
*/

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000

// const mongoose = require('mongoose')

const app = express()

//middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pages = require('./routes/pages.js')
const pagescontent = require('./routes/pagescontent')

app.use('/pages', pages)
app.use('/pagescontent', pagescontent)
// database connection

// run server

app.listen(port, () => {
  console.log(`server running at ${port}`)
})
