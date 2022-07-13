/* 
This service just calls the api we made using axios to make a get request to the local server.
We call this event service in our state mgmt component
*/

// TODO: move the api urls to environment variables, or other variables that can be globally changed

import axios from 'axios'

async function postPagesEvent(title) {
  // i think the title is being transformed here
  console.log(`from postpages event ${title.body}`)
  let res = await axios
    .post('http://localhost:3000/pages', title)
    .catch((error) => {
      console.log(error.toJSON())
    })
  return res.data
}

async function postSMS(body) {
  let res = await axios.post(`http://localhost:3000/sms?id=${body.id}`, body)
  return res.data
}

/**
 *
 * @returns list of pages from a database
 */
async function getPagesEvent() {
  let res = await axios.get('http://localhost:3000/pages').catch((error) => {
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
    .get(`http://localhost:3000/pagescontent?id=${id}`)
    .catch((error) => {
      console.log(error.toJSON())
    })
  return res.data
}

// TODO: event that use patch endpoint at SMS

export { getPagesContentEvent, getPagesEvent, postPagesEvent, postSMS }
