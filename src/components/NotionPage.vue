<template>
  <h3>Notion Page Content</h3>
  <button class="send-to-phone" @click.prevent="onClickSend(pagecontent)">
    Send to Phone
  </button>
  <div class="page-content-wrapper">
    <div
      v-for="contentBlock in pagecontent"
      :key="contentBlock.id"
      class="page-content"
    >
      <div v-if="contentBlock.type == 'image'">
        <img :src="contentBlock.image.file.url" />
      </div>
      <div v-else-if="contentBlock.type == 'paragraph'">
        <p>{{ contentBlock.paragraph.rich_text[0].plain_text }}</p>
      </div>
      <div v-else>
        <h2>nothin</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageContent, loadPageContent } from '../state/state.js'
import { useRouter } from 'vue-router'
import { selectRandomIndex } from '@/utils/index.js'
// import { postSMS } from '../services/EventService.js'

// import { computed } from 'vue'

export default {
  name: 'NotionPage',
  setup() {
    const router = useRouter()
    function retrievePageContent(param) {
      loadPageContent(param)
      console.log(`from retrievePageContent ${param}`)
      getPageContent
    }

    const pagecontent = getPageContent

    async function onClickSend(pagecontent) {
      let body = pagecontent.filter((block) => block.type == 'paragraph')
      let i = selectRandomIndex(body)
      let text = body[i]

      let textcontent = text.paragraph.rich_text[0].plain_text
      while (textcontent.length < 300) {
        if (i >= body.length - 1) {
          break
        } else {
          i += 1
          textcontent = textcontent.concat(
            '...',
            body[i].paragraph.rich_text[0].plain_text
          )
        }
      }
      /* await postSMS({
        body: textcontent,
      }) */
    }

    return {
      pagecontent,
      retrievePageContent,
      router,
      onClickSend,
    }
  },
  created() {
    const param = this.$route.params.id
    this.retrievePageContent(param)
    console.log(`from created NotionPage.vue ${this.$route.params.id}`)
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
.page-content {
  padding: 20px;
  margin: 20px;
  border: 0.5px solid rgb(196, 196, 196);
  border-radius: 10px;
}

img {
  max-width: 400px;
}
p {
  text-align: justify;
}
</style>
