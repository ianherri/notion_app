require('dotenv').config()

const express = require('express')
const router = express.Router()
const axios = require('axios')

// this is an endpoint that Twilio will hit with the text content...

router.post('/', async (req, res) => {
  let msgBody = req.body.Body
  console.log(msgBody)
  await postResponse(msgBody)
  res.status(201).send()
})

// TODO: need to get the correct block.id variable somehow into this function
// TODO: need to record most recent random text sent in state somewhere so I can grab block.id
async function postResponse(body) {
  let id = '389a9bec-a7dd-4beb-9177-63872de2c200'
  let content = { content: body }
  let res = await axios
    .patch(`http://localhost:3000/pagescontent?id=${id}`, content)
    .catch((error) => {
      console.log(error.toJSON())
    })
  return res.data
}

module.exports = router
