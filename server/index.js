/* 
This is our node express server
It runs on server 3000
It also establishes the routes we will follow to access specific endpoints
This is the server that we make requests *to* from our axios http request in services/Eventservices.js
*/

require('dotenv').config()

const cron = require('node-cron')

const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000

const ngrok = require('ngrok')

// const mongoose = require('mongoose')

const app = express()

//middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pages = require('./routes/pages.js')
const pagescontent = require('./routes/pagescontent')
const sms = require('./routes/sms.js')
const receivesms = require('./routes/receivesms.js')

app.use('/pages', pages)
app.use('/pagescontent', pagescontent)
app.use('/sms', sms)
app.use('/receivesms', receivesms)

// @SHANE - the id is query param that should be retrieved here
sms.get('/sms', (req, res) => {
  console.log(`from app.get ${req.query.id}`)
  console.log(`from app.get ${res}`)
})
// run server

app.listen(port, () => {
  console.log(`server running at ${port}`)
})

ngrok.connect(
  {
    proto: 'http',
    addr: process.env.PORT,
  },
  (err, url) => {
    if (err) {
      console.error(
        `Error while connecting to Ngrok ${err} here is the url ${url}`
      )
      return new Error('Ngrok Failed')
    }
  }
)

const cronJob = (fn) => {
  cron.schedule('* * * * *', fn)
}

cronJob(() => {
  console.log('cron is running every minute')
})
