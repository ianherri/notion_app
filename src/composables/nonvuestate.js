/* 
Simple state mgmt code calls the Event Service to retrieve data from backend.
Import this anywhere we need access to state
*/

import {
  getPagesContentEvent,
  getPagesEvent,
  postPagesEvent,
} from '../services/EventService.js'
import { isParagraph, filterForNonEmptyText } from '../utils/index.js'

// ----------- state variables ----------------
const pages = [{ id: '', name: '', content: [] }]
const loaded = false

async function loadPages() {
  const newPages = await getPagesEvent()
  await setPages(newPages)
}

async function setPages(newPages) {
  const idList = newPages.map((page) => ({
    id: page.id,
    name: page.properties.Name.title[0].text.content,
  }))
  return await resolvePages(idList)
}

async function resolvePages(idList) {
  const pagePromises = idList.map(getPageContent)
  pages.value = await Promise.all(pagePromises)
  return pages
}

async function getPageContent(page) {
  const content = await loadPageContent(page.id)
  return {
    id: page.id,
    name: page.name,
    content,
  }
}

/*
@returns text and image content from child blocks of single given parent element id
*/
// TODO: support all text content types: callout blocks, etc.
// https://developers.notion.com/reference/block

async function loadPageContent(id) {
  const flat = []
  const pageContent = await getPagesContentEvent(id)

  for (let block of pageContent) {
    if (block.has_children) {
      const result = await loadPageContent(block.id)
      flat.push(block, ...result)
    } else flat.push(block)
  }

  return filterForNonEmptyText(
    flat.filter((block) => block.type === 'image' || isParagraph(block))
  )
}

async function addPage(title) {
  console.log(`from addPage ${title}`)
  await postPagesEvent({
    content: title,
  })
  await loadPages()
}

/**
 * Composable function of app state
 *
 * @returns {*} app state
 */

export default function useState() {
  return { pages, loadPages, addPage, loaded, loadPageContent }
}
