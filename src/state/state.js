/* 
This is our simple state mgmt code
It calls the Event Service to retrieve data from backend
It sets up a state variable
We can import this anywhere we need access to state
*/

import {
  getPagesContentEvent,
  getPagesEvent,
  postPagesEvent,
} from '@/services/EventService'
import { ref, computed } from 'vue'

// ----------- state variables ----------------
const state = ref({ page: [] })
const pagestate = ref({ pagecontent: [] })

//------- utility to set new state -------
function setPages(page) {
  console.log(page.length)
  state.value.page = page
}

function setPageContent(pagecontent) {
  pagestate.value.pagecontent = pagecontent
}

// ----------- fetchers ----------------
// action to fetch new state from server
// this is where the state begins
// it retrieves data from database then calls set.... to set state
async function loadPages() {
  const page = await getPagesEvent()
  setPages(page)
}

async function loadPageContent(blockId) {
  console.log(`From loadPageContent ${blockId}`)
  const pagecontent = await getPagesContentEvent(blockId)

  setPageContent(pagecontent)
}

// this is working but it's not updating state
// maybe I should handle that elsewhere?
async function addPage(title) {
  console.log(`from addPage ${title}`)
  await postPagesEvent({
    content: title,
  })
  loadPages()
}

// ----------- getters ----------------
const getPages = computed(() => state.value.page)

const getPageContent = computed(() => {
  const isParagraph = (b) => {
    if (b.type == 'paragraph' && b.paragraph.rich_text.length > 0) {
      return true
    }
  }
  let blocks = pagestate.value.pagecontent
  let result = blocks.filter(
    (block) => block.type == 'image' || isParagraph(block)
  )
  return result
})

export { loadPages, getPages, addPage, loadPageContent, getPageContent }
