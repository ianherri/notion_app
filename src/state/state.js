/* 
This is our simple state mgmt code
It calls the Event Service to retrieve data from backend
It sets up a state variable
We can import this anywhere we need access to state
*/

import EventService from '@/services/EventService'
import { ref, computed } from 'vue'

const state = ref({ post: {} })

function setData(post) {
  state.value.post = post
}

// action to fetch new state
// uses setData to update state
async function loadData() {
  const post = await EventService.getEvents()
  setData(post)
}

// this is working but it's not updating state
// maybe I should handle that elsewhere?
async function addData(title) {
  console.log(`from addData ${title}`)
  await EventService.postEvent({
    content: title,
  })
  loadData()
}

// getter to access state
const getData = computed(() => state.value.post)

export { loadData, getData, addData }
