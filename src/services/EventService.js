/* 
This service just calls the api we made using axios to make a get request to the local server.
We call this event service in our state mgmt component
*/

// TODO: move the api urls to environment variables, or other variables that can be globally changed

import axios from 'axios'

async function postPagesEvent(title) {
  // i think the title is being transformed here
  let res = await axios
    .post('http://localhost:3000/pages', title)
    .catch((error) => {
      console.log(error.toJSON())
    })
  return res.data
}

async function postSMS(body) {
  let res = await axios.post('http://localhost:3000/sendsms', body)
  return res.data
}

// returns list of page objects
async function getPagesEvent() {
  let res = await axios.get('http://localhost:3000/pages').catch((error) => {
    console.log(error.toJSON())
  })
  return res.data
}

async function getPagesContentEvent(id) {
  let res = await axios
    .get(`http://localhost:3000/pagescontent?id=${id}`)
    .catch((error) => {
      console.log(error.toJSON())
    })
  return res.data
}

export { getPagesContentEvent, getPagesEvent, postPagesEvent, postSMS }
