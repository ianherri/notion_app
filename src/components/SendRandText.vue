<template>
  <div>
    <button
      :disabled="!loaded"
      class="send-to-phone"
      @click.prevent="onClickPickRandomPage()"
    >
      Send Data to Phone
    </button>
  </div>
</template>

<script setup>
import useState from '@/composables/state.js'
import { selectRandomIndex } from '@/utils/index.js'
import { postSMS } from '../services/EventService.js'

const { pages, loaded } = useState()

function onClickPickRandomPage() {
  console.log(pages.value)
  function pickPage() {
    let pageIndex = selectRandomIndex(pages.value)
    const randomPage = pages.value[pageIndex]
    console.log(randomPage.id)
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

  console.log(randomPage)

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
