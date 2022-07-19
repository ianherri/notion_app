const useState = require('./composables/state.js')
const Utils = require('./utils/index.js')
const EventService = require('./services/EventService.js')

const loadPages = useState.loadPages
const pages = useState.pages
const selectRandomIndex = Utils.selectRandomIndex
const postSMS = EventService.postSMS

loadPages()

async function sendText() {
  await loadPages()

  function pickPage() {
    let pageIndex = selectRandomIndex(pages.value)
    const randomPage = pages.value[pageIndex]

    if (
      randomPage.content[0].type === 'paragraph' &&
      randomPage.content[0].paragraph.rich_text[0].text.content === 'no content'
    ) {
      return pickPage()
    } else {
      return randomPage
    }
  }

  const randomPage = pickPage()

  let textOnlyContent = randomPage.content.filter(
    (block) => block.type === 'paragraph'
  )
  let i = selectRandomIndex(textOnlyContent)
  let textcontent = textOnlyContent[i].paragraph.rich_text[0].text.content
  let blockId = textOnlyContent[i].id

  while (textcontent.length < 300) {
    if (i >= textOnlyContent.length - 1) {
      break
    } else {
      i += 1
      textcontent = textcontent.concat(
        '...',
        textOnlyContent[i].paragraph.rich_text[0].text.content
      )
    }
    blockId = textOnlyContent[i].id
  }
  postSMS({
    body: randomPage.name.concat(': ', textcontent),
    blockId: blockId,
  })
}

module.exports = { sendText }
