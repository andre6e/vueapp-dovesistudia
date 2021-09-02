<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Header/>
    <GlobalView/>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import GlobalView from './components/GlobalView.vue'

export default {
  name: 'App',
  components: {
    Header,
    GlobalView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

/* OVERRIDE */
.heading {
    font-size: 13px !important;
}
</style>
