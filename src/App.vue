<template>
  <NotionHome />
</template>

<script>
import NotionHome from './components/NotionHome.vue'

export default {
  name: 'App',
  components: {
    NotionHome,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0a1c2e;
  margin-top: 60px;
}
</style>
