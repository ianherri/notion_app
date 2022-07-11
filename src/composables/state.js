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
import { ref, onMounted } from 'vue'

// ----------- state variables ----------------
const pages = ref([{ id: '', name: '', content: [] }])
const loaded = ref(false)
// STEP 1:
//--------- fetchers ----------------
// action to fetch new state from axios server @ EventService.js
// this is where the state begins
// it retrieves data from database then calls set.... to set state
async function loadPages() {
  const newPages = await getPagesEvent()

  await setPages(newPages)
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
  await loadPages()
}

// STEP 2:
//---------- setters -------------
async function setPages(newPages) {
  const idList = newPages.map((page) => ({
    id: page.id,
    name: page.properties.Name.title[0].plain_text,
  }))
  return await resolvePages(idList)
}

async function getElementContent(element) {
  const content = await loadPageContent(element.id)
  return {
    id: element.id,
    name: element.name,
    content,
  }
}

async function resolvePages(idList) {
  const pagePromises = idList.map(getElementContent)
  pages.value = await Promise.all(pagePromises)
  return pages
}

/* async function filterPages(id) {
  onMounted(async () => {
    if (!loaded.value) {
      await loadPages()
      loaded.value = true
    }
    const filteredPage = pages.value.filter((page) => page.id == id)[0]
    console.log(`from filterPage function ${loaded.value}`)
    console.log(`from filterPage function ${filteredPage.content}`)
    return filteredPage
  })
} */

// STEP 3:
// ----------- getters ----------------
// "ref has a .value property that you use to get its content. Not required when referencing from template

/**
 * Composable function of app state
 *
 * @returns {*} app state
 */
export default function useState() {
  onMounted(async () => {
    if (!loaded.value) {
      await loadPages()
      loaded.value = true
    }
  })

  return { pages, loadPages, addPage, loaded }
}
