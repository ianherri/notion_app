require('dotenv').config()

const { isReceivingText } = require('./routes/receivesms.js')

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
const { router } = require('./routes/receivesms.js')

app.use('/pages', pagesRoute)
app.use('/pagescontent', pagescontentRoute)
app.use('/sms', smsRoute)
app.use('/receivesms', router)

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

//  if there is a request coming to receivesms endpointt
// do notthing
// else, sendtext()
// value of isReceivingTextt set to false most of the time
// mutated inside the endpoint that receives texts from twilio
if (!isReceivingText) {
  sendText()
}
