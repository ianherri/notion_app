<template>
  <h3>Notion Pages</h3>
  <p>Try clicking to see more...</p>
  <div v-if="loaded" class="page-list-wrapper">
    <div class="posts" v-for="page in pages" :key="page.id">
      <div class="post">
        {{ page.name }}
        <button class="see-more-button" @click="onClickGetContent(page.id)">
          See More
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <h3>Loading...</h3>
  </div>
  <div class="add-post">
    <form action="submit">
      <input v-model="title" type="text" placeholder="Add a new page" />
      <button @click.prevent="onClickAdd(title)">Post</button>
    </form>
  </div>
</template>

<script setup>
import useState from '@/composables/state.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const { pages, addPage, loaded } = useState()

console.log(pages)

onMounted(() => {
  setTimeout(() => {
    console.log(pages.value)
  }, 5000)
})

function onClickAdd(title) {
  addPage(title)
  console.log(`from onClickAdd ${title}`)
}
function onClickGetContent(id) {
  router.push(`/pagescontent/${id}`)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-list-wrapper {
  display: flex wrap;
  flex-direction: row;
}
.posts {
  color: rgb(31, 62, 62);
  display: flex wrap;
  flex-direction: row;
}
.post {
  padding: 20px;
  margin: 20px;
  border: 0.5px solid rgb(196, 196, 196);
  border-radius: 10px;
}

.see-more-button {
  width: fit-content;
  margin: 10px;
  padding: 2px 10px 2px 10px;
  background-color: rgb(255, 191, 0);
  text-decoration: none;
  border-radius: 4px;
  border: none;
}

.see-more-button:hover {
  transition: ease-in-out 500ms;
  background-color: rgb(16, 188, 207);
  cursor: pointer;
}
</style>
