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

const ngrok = require('ngrok')

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
