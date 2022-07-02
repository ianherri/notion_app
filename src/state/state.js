/* 
This is our simple state mgmt code
It calls the Event Service to retrieve data from backend
It sets up a state variable
We can import this anywhere we need access to state
*/

import EventService from '@/services/EventService'
import { ref, computed } from 'vue'

// ----------- state variables ----------------
const state = ref({ page: [] })
const pagestate = ref({ pagecontent: [] })

//------- utility to set new state -------
function setPages(page) {
  state.value.page = page
}

function setPageContent(pagecontent) {
  pagestate.value.pagecontent = pagecontent
}

// ----------- fetchers ----------------
// action to fetch new state from server
async function loadPages() {
  const page = await EventService.getPagesEvent()
  setPages(page)
}

async function loadPageContent(blockId) {
  console.log(`From loadPageContent ${blockId}`)
  const pagecontent = await EventService.getPagesContentEvent(blockId)
  setPageContent(pagecontent)
}

// ----------- setters ----------------

// this is working but it's not updating state
// maybe I should handle that elsewhere?
async function addPage(title) {
  console.log(`from addPage ${title}`)
  await EventService.postPagesEvent({
    content: title,
  })
  loadPages()
}

// ----------- getters ----------------
const getPages = computed(() => state.value.page)

const getPageContent = computed(() => {
  let blocks = pagestate.value.pagecontent
  pagestate.value.pagecontent = []
  let result = blocks.filter((block) => block.type == 'paragraph' || 'image')

  return result
})

export { loadPages, getPages, addPage, loadPageContent, getPageContent }
