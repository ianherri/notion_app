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
const state = ref([{ id: '', name: '', content: [] }])

// STEP 1:
//--------- fetchers ----------------
// action to fetch new state from axios server @ EventService.js
// this is where the state begins
// it retrieves data from database then calls set.... to set state
async function loadPages() {
  await getPagesEvent().then((pages) => {
    setPages(pages)
  })
}

async function loadPageContent(id) {
  function isParagraph(block) {
    if (block.type == 'paragraph' && block.paragraph.rich_text.length > 0) {
      return true
    }
    return false
  }
  // returns list of blocks for single block id
  const pagecontent = await getPagesContentEvent(id)
    .then((blocks) => {
      return blocks.filter(
        (block) => block.type == 'image' || isParagraph(block)
      )
    })
    .catch((error) => console.log(error))

  // filter for empty pagecontent
  if (pagecontent.length == 0) {
    const dummyContent = [
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{ plain_text: 'no content' }],
        },
      },
    ]
    return dummyContent
  }
  return pagecontent
}

async function addPage(title) {
  console.log(`from addPage ${title}`)
  await postPagesEvent({
    content: title,
  })
  loadPages()
}

// STEP 2:
//---------- setters -------------
function setPages(pages) {
  const idList = pages.map((page) => ({
    id: page.id,
    name: page.properties.Name.title[0].plain_text,
  }))

  return resolvePages(idList)
}

async function resolvePages(idList) {
  state.value = await Promise.all(
    idList.map(async (element) => ({
      id: element.id,
      name: element.name,
      content: await loadPageContent(element.id),
    }))
  )
  return state
}

// STEP 3:
// ----------- getters ----------------
// "ref has a .value property that you use to get its content. Not required when referencing from template
const getPages = computed(() => {
  return state
})

export { getPages, loadPages, addPage }
