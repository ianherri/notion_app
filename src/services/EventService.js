/* 
This service just calls the api we made using axios to make a get request to the local server.
We call this event service in our state mgmt component
*/

import axios from 'axios'

async function postPagesEvent(title) {
  // i think the title is being transformed here
  let res = await axios.post('http://localhost:3000/pages', title)
  console.log(`postPagesEvent ${title}`)
  return res.data
}

async function postSMS(body) {
  let res = await axios.post('http://localhost:3000/sendsms', body)
  return res.data
}

async function getPagesEvent() {
  let res = await axios.get('http://localhost:3000/pages').catch((error) => {
    console.log(error)
  })
  console.log(`getPagesEvent ${res.data.length}`)
  return res.data
}

async function getPagesContentEvent(blockId) {
  let res = await axios
    .get(`http://localhost:3000/pagescontent?blockId=${blockId}`)
    .catch((error) => {
      console.log(error)
    })
  return res.data
}

export { getPagesContentEvent, getPagesEvent, postPagesEvent, postSMS }
