<template>
  <div id="app">
    <div v-if="productos">
    <notifications group="notificacion"/>
    <cabecera/>
    <router-view/>
    <pie/>
    </div>
    <div v-if="!productos" class="cargando">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>

import cabecera from './components/cabecera.vue'
import pie from'./components/pie.vue'
import {db} from './db.js'


export default {
  name: 'App',
  components: {
    cabecera,
    pie
    
  },
  data () {
      return {
        productos:{}      
    }
  },
    firestore:{
      productos:db.collection('productos')
      
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
.cargando{
  height: 100%;
}
.spinner-borde{
  margin:auto;
}


</style>
