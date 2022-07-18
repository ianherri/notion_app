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

// send an sms via post

router.post('/', async (req, res) => {
  console.log(req)
  await sendNewSMS(req.body)
  res.status(201).send()
})

// @SHANE - the id is also here in case this is easier to store
async function sendNewSMS(text) {
  console.log(`from sendNewSMS ${text.blockId}`)
  const response = await client.messages
    .create({
      body: text.body,
      from: outBoundNum,
      to: '+16037241036',
    })
    .then((message) => console.log(`from sendNewSMS ${message.sid}`))
  return response
}

module.exports = router
