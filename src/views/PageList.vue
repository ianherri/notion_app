<template>
  <h3>Notion Pages</h3>
  <p>Try clicking to see more...</p>
  <div class="posts" v-for="post in posts" :key="post.id">
    <div class="post">
      {{ `The page title is: ${post.name}` }}
      {{ post.id }}
      <button class="see-more-button" @click="onClickGetContent(post.id)">
        See More
      </button>
    </div>
  </div>
  <div class="add-post">
    <form action="submit">
      <input v-model="title" type="text" placeholder="Add a new page" />
      <button @click.prevent="onClickAdd(title)">Post</button>
    </form>
  </div>
</template>

<script>
import { getPages, loadPages, addPage } from '@/state/staterefactor.js'
import { useRouter } from 'vue-router'

export default {
  name: 'NotionHome',
  created() {
    loadPages()
  },
  setup() {
    const router = useRouter()
    const posts = getPages.value

    function onClickAdd(title) {
      addPage(title)
      console.log(`from onClickAdd ${title}`)
    }
    function onClickGetContent(id) {
      router.push(`/pagescontent/${id}`)
    }
    return {
      posts,
      onClickAdd,
      onClickGetContent,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.posts {
  color: rgb(31, 62, 62);
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
