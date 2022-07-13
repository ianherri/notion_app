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

async function sendNewSMS(text) {
  const response = await client.messages
    .create({
      body: text.body,
      from: outBoundNum,
      to: '+16037241036',
    })
    .then((message) => console.log(message.sid))
  return response
}

// receive SMS

client
  .incomingPhoneNumbers('+16037241036')
  .update({ smsUrl: 'https://test-1337.twil.io/my-test-function' })
  .then((phoneNumber) => console.log(phoneNumber.smsUrl))

module.exports = router
