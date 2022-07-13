require('dotenv').config()

const express = require('express')
const router = express.Router()

// send an sms via post

router.post('/', async (req, res) => {
  var msgBody = req.body.Body
  console.log(msgBody)
  console.log(res.body.Body)
})

module.exports = router
