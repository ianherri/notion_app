/* 
This service just calls the api we made using axios to make a get request to the local server.
We call this event service in our state mgmt component
*/

// TODO: move the api urls to environment variables, or other variables that can be globally changed
require('dotenv').config()

const port = process.env.PORT || 5000
const axios = require('axios')

async function postPagesEvent(title) {
  let res = await axios
    .post(`http://localhost:${port}/pages`, title)
    .catch((error) => {
      console.log(error.toJSON())
    })
  return res.data
}

async function postSMS(body) {
  let res = await axios.post(`http://localhost:${port}/sms?id=${body.id}`, body)
  let message = {
    //TODO: is res.data the message sid returned from the post request to the endpoint above?
    // the endpoint is /sms
    messageSid: res.data,
    blockId: body.blockId,
    text: body.body,
    createdAt: new Date(),
  }
  postMessagesToDb(message)
}

// res not defined....
async function postMessagesToDb(message) {
  await axios
    .post(`http://localhost:${port}/sms/db`, message)
    .catch((error) => {
      console.log(error.toJSON())
    })
}

/**
 *
 * @returns list of pages from a database
 */
async function getPagesEvent() {
  let res = await axios.get(`http://localhost:${port}/pages`).catch((error) => {
    console.log(error.toJSON())
  })
  return res.data
}

/**
 *
 * @returns list of child blocks of parent block/page using id
 */
async function getPagesContentEvent(id) {
  let res = await axios
    .get(`http://localhost:${port}/pagescontent?id=${id}`)
    .catch((error) => {
      console.log(error.toJSON())
    })
  return res.data
}

// TODO: event that use patch endpoint at SMS

module.exports = {
  getPagesContentEvent,
  getPagesEvent,
  postPagesEvent,
  postSMS,
}
