<template>
  <div class="nav">
    <router-link class="router" to="/"
      ><img src="./assets/notion_app_logo.png"
    /></router-link>
    <router-link class="router" to="/pagelist">Pages</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>

<style>
body {
  margin: 0;
}

img {
  max-height: 24px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #130444;
  min-height: 100vh;
  background-color: #ffffff;
}

.nav {
  display: flex;
  background-color: antiquewhite;
  width: 100%;
}

.router {
  width: fit-content;
  color: #130444;
  margin: 10px;
  padding: 2px 10px 2px 10px;
  background-color: antiquewhite;
  text-decoration: underline rgba(0, 0, 0, 0);
  transition: text-decoration-color 300ms;
  border-radius: 4px;
}

.router:hover {
  transition: ease-in-out 500ms;
  text-decoration-color: #0a1c2e;
}
</style>
