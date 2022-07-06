<template>
  <div>
    <button class="send-to-phone" @click.prevent="onClickPickRandomPage(pages)">
      Send Data to Phone
    </button>
  </div>
</template>

<script>
import {
  getPages,
  loadPages,
  loadPageContent,
  getPageContent,
} from '../state/state.js'
import { selectRandomIndex } from '@/utils/index.js'
import { postSMS } from '../services/EventService.js'

export default {
  name: 'SendRandText',
  created() {
    loadPages()
  },
  setup() {
    async function onClickPickRandomPage() {
      const pages = await getPages
      let i = selectRandomIndex(pages.value) - 1
      let randompageId = pages.value[i].id
      let title = pages.value[i].properties.Name.title[0].text.content

      await loadPageContent(randompageId)

      const pagecontent = await getPageContent

      if (pagecontent.value.length > 0) {
        pagecontent
      } else {
        return onClickPickRandomPage
      }

      sendRandomTextContent(pagecontent.value, title)
    }

    function sendRandomTextContent(page, title) {
      let nonemptybody = page.filter((block) => block.type == 'paragraph')

      let i = selectRandomIndex(nonemptybody)

      let text = nonemptybody[i]

      let textcontent =
        text.paragraph.rich_text.length > 0
          ? text.paragraph.rich_text[0].plain_text
          : 'empty entry'

      while (textcontent.length < 300) {
        if (i >= nonemptybody.length - 1) {
          break
        } else {
          i += 1
          textcontent = textcontent.concat(
            '...',
            nonemptybody[i].paragraph.rich_text[0].plain_text
          )
        }
      }
      postSMS({
        body: title.concat(': ', textcontent),
      })
    }

    return { onClickPickRandomPage, sendRandomTextContent }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.send-to-phone {
  width: fit-content;
  margin: 10px;
  padding: 2px 10px 2px 10px;
  background-color: rgb(255, 191, 0);
  text-decoration: none;
  border-radius: 4px;
  border: none;
}

.send-to-phone:hover {
  transition: ease-in-out 500ms;
  background-color: rgb(16, 188, 207);
  cursor: pointer;
}

img {
  max-width: 400px;
}
p {
  text-align: justify;
}
</style>
