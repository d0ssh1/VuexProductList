<template>
  <div id="app">
    <h1>Product List</h1>
    <Products />
  </div>
</template>

<script>
import Products from './views/Products.vue';

export default {
  name: 'App',
  components: {
    Products,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  color: #42b983;
}
</style>
