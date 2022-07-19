require('dotenv').config()

const main = require('./main')

const cron = require('node-cron')

const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000

const ngrok = require('ngrok')

const app = express()

const sendText = main.sendText

//middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pagesRoute = require('./routes/pages.js')
const pagescontentRoute = require('./routes/pagescontent')
const smsRoute = require('./routes/sms.js')
const receivesmsRoute = require('./routes/receivesms.js')

app.use('/pages', pagesRoute)
app.use('/pagescontent', pagescontentRoute)
app.use('/sms', smsRoute)
app.use('/receivesms', receivesmsRoute)

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

sendText()
