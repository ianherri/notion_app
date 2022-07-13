require('dotenv').config()

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const outBoundNum = process.env.TWILIO_TRIAL_PN
const client = require('twilio')(accountSid, authToken)

const express = require('express')
const router = express.Router()

// send an sms via post

router.post('/', async (req, res) => {
  console.log(req)
  await sendNewSMS(req.body)
  res.status(201).send()
})

// @SHANE - the id is also here in case this is easier to store
async function sendNewSMS(text) {
  const replyId = text.replyId
  const response = await client.messages
    .create({
      body: text.body,
      from: outBoundNum,
      to: '+16037241036',
    })
    .then((message) => console.log(message.sid))
  return { response, replyId }
}

module.exports = router
