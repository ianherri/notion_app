require('dotenv').config()

const express = require('express')
const router = express.Router()
const axios = require('axios')

const mongodb = require('mongodb')
const uri = process.env.MONGODB_URI

const port = process.env.PORT || 5000

// create endpoint with sms status
router.post('/status', async (req, res) => {
  // req.body.SmsSid has the sid here
  console.log(`from twilio ${JSON.stringify(req.body)}`)
  res.status(201).send()
})

// this is an endpoint that Twilio will hit with the text content...

router.post('/', async (req, res) => {
  let msgBody = req.body.Body
  console.log(`from twilio ${JSON.stringify(req.body)}`)
  await postResponse(msgBody)
  res.status(201).send()
})

async function postResponse(body) {
  const messages = await loadMessagesCollection()
  const options = {
    sort: { createdAt: -1 },
  }

  const document = await messages.findOne({}, options)
  const id = document.blockId
  const content = { content: body }

  let res = await axios
    .patch(`http://localhost:${port}/pagescontent?id=${id}`, content)
    .catch((error) => {
      console.log(error.toJSON())
    })
  return res.data
}

async function loadMessagesCollection() {
  const client = await mongodb.MongoClient.connect(uri, {
    useNewURLParser: true,
  })

  return client.db('notion-reminders-app').collection('messages')
}

module.exports = router
