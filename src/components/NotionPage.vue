<template>
  <h3>Notion Page Content</h3>
  <button
    class="send-to-phone"
    @click.prevent="onClickSend(singlePageContent.content)"
  >
    Send to Phone
  </button>
  <div v-if="singlePageContent" class="page-content-wrapper">
    <h3>Title: {{ singlePageContent.name }}</h3>
    <div
      v-for="block in singlePageContent.content"
      :key="block.id"
      class="page-content"
    >
      <div v-if="block.type == 'image'">
        <img :src="block.image.file.url" />
      </div>
      <div v-else-if="block.type == 'paragraph'">
        <p>{{ block.paragraph.rich_text[0].text.content }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <h3>Loading...</h3>
  </div>
</template>

<script setup>
import useState from '@/composables/state'
import { useRoute } from 'vue-router'
import { selectRandomIndex } from '@/utils/index.js'
import { postSMS } from '@/services/EventService.js'
import { watch, ref } from 'vue'

const router = useRoute()
const { pages } = useState()
const singlePageContent = ref(
  pages.value.filter((page) => page.id === router.params.id)[0]
)

console.log(singlePageContent.value)

watch(pages, (newPages) => {
  singlePageContent.value = newPages.filter(
    (page) => page.id === router.params.id
  )[0]
})

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
  await postSMS({
    body: textcontent,
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
