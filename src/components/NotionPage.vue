<template>
  <h3>Notion Page Content</h3>
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

// import { computed } from 'vue'

export default {
  name: 'NotionPage',
  setup() {
    const router = useRouter()

    function onClickRetrievePageContent(param) {
      loadPageContent(param)
      console.log(`from onClickRetrievePageContent ${param}`)
      getPageContent
    }

    const pagecontent = getPageContent

    return {
      pagecontent,
      onClickRetrievePageContent,
      router,
    }
  },
  created() {
    const param = this.$route.params.id
    this.onClickRetrievePageContent(param)
    console.log(`from created NotionPage.vue ${this.$route.params.id}`)
  },
}
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
