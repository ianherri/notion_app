<template>
  <div>
    <button class="send-to-phone" @click.prevent="onClickPickRandomPage()">
      Send Data to Phone
    </button>
  </div>
</template>

<script>
import useState from '@/composables/state.js'
import { selectRandomIndex } from '@/utils/index.js'

import { postSMS } from '../services/EventService.js'

// TODO: Figure out why state doesn't load on first try.....
export default {
  name: 'SendRandText',

  setup() {
    const { pages, loadPages } = useState()

    async function onClickPickRandomPage() {
      await loadPages().then(async () => {
        let pageIndex = selectRandomIndex(pages.value.value)

        const randomPage = pages.value.value[pageIndex]

        let nonemptybody = randomPage.content.filter(
          (block) => block.type == 'paragraph'
        )
        let i = selectRandomIndex(nonemptybody)
        let text = nonemptybody[i]
        let textcontent = text.paragraph.rich_text[0].plain_text

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
        console.log(randomPage.name, textcontent)
        await postSMS({
          body: randomPage.name.concat(': ', textcontent),
        })
      })
    }

    return { onClickPickRandomPage }
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
