<template>
  <div id="app">
    <notifications group="notificacion"/>
    <cabecera/>
    <router-view/>
    <pie/>
    
  </div>
</template>

<script>

import cabecera from './components/cabecera.vue'
import pie from'./components/pie.vue'


export default {
  name: 'App',
  components: {
    cabecera,
    pie
    
  }

}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Hind:wght@500&display=swap');


#app {
  font-family: 'Hind', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:color(terciary);
}


</style>
