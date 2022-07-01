<template>
  <h3>Notion Pages</h3>
  <div class="posts" v-for="post in posts" :key="post.id">
    <div class="post">
      {{ `The post author is: ${post.properties.Author.multi_select[0].name}` }}
    </div>
  </div>
  <div class="add-post">
    <form action="submit">
      <input v-model="title" type="text" placeholder="type something" />
      <button @click.prevent="onClickAdd(title)">Post</button>
    </form>
  </div>
</template>

<script>
import { getData, loadData, addData } from '@/state/state.js'

export default {
  name: 'NotionHome',
  created() {
    loadData()
  },
  setup() {
    const posts = getData
    function onClickAdd(title) {
      addData(title)
      console.log(`from onClickAdd ${title}`)
    }
    return {
      posts,
      onClickAdd,
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
  margin: 10px;
  border: 0.5px solid rgb(196, 196, 196);
  border-radius: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
