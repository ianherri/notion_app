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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0a1c2e;
  margin-top: 60px;
}

.nav {
  display: block;

  margin: 20px;
}

.router {
  width: fit-content;
  margin: 10px;
  padding: 2px 10px 2px 10px;
  background-color: aqua;
  text-decoration: none;
  border-radius: 4px;
}

.router:hover {
  transition: ease-in-out 500ms;
  background-color: coral;
}
</style>
