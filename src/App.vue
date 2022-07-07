<template>
  <div class="nav">
    <router-link class="router" to="/">Home</router-link>
    <router-link class="router" to="/pagelist">Page List</router-link>
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #130444;
  min-height: 100vh;
  background-color: #ffffff;
  border: -10px;
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
