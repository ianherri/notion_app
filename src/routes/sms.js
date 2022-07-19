require('dotenv').config()

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const outBoundNum = process.env.TWILIO_TRIAL_PN
const client = require('twilio')(accountSid, authToken)

const express = require('express')
const router = express.Router()

const mongodb = require('mongodb')
const uri = process.env.MONGODB_URI

// store sms to db

router.post('/db', async (req, res) => {
  const messages = await loadMessagesCollection()
  await messages.insertOne({
    messageSid: req.body.messageSid,
    blockId: req.body.blockId,
    text: req.body.text,
    createdAt: new Date(),
  })
  res.status(201).send()
})

async function loadMessagesCollection() {
  const client = await mongodb.MongoClient.connect(uri, {
    useNewURLParser: true,
  })

  return client.db('notion-reminders-app').collection('messages')
}

// TODO: is the response here === message.sid?
router.post('/', async (req, res) => {
  let response = await sendNewSMS(req.body)
  res.status(201).send()
  return response
})

// TODO: is the 'response' here the message.sid value?
async function sendNewSMS(text) {
  let response = await client.messages
    .create({
      body: text.body,
      from: outBoundNum,
      to: '+16037241036',
      statusCallback:
        'https://f82b-2603-8080-1303-97e4-563-efb4-caaa-af18.ngrok.io/receivesms/status',
    })
    .then((message) => message.sid)
  return response
}

module.exports = router
