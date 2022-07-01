/* 
This service just calls the api we made using axios to make a get request to the local server.
We call this event service in our state mgmt component
*/

import axios from 'axios'

export default {
  async postEvent(title) {
    let res = await axios.post('http://localhost:3000/pages', title)
    console.log(`postEvent ${title}`)
    return res.data
  },

  async getEvents() {
    let res = await axios.get('http://localhost:3000/pages')
    console.log(`getEvents ${res.data.length}`)
    return res.data
  },
}
