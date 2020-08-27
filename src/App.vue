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
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

/* WORKAROUND: vue-choropleth non carica la classe se la componente l-info-control non viene usata */
.info {
  padding: 6px 8px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* font: 18px/20px sans-serif; */
  background: hsla(0,0%,100%,.8);
  box-shadow: 0 0 15px rgba(0,0,0,.2);
  border-radius: 5px;
}
</style>
