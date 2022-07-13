<template>
  <h3>Notion Page Content</h3>
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
