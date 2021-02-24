<template lang="html">

  <section class="cabecera">
    <nav class="navbar navbar-expand-lg  d-flex justify-content-between">
  <router-link to="/"><img id="logo" src="../assets/playstation.png"></router-link>
  <div>
    <router-link to="/admin"> <button v-if="administrador" class="btn boton">administrador</button> </router-link>
  </div>
  <div class="d-flex justify-content-around align-items-center">
      
      <router-link to="/login"><div v-if="!user.loggedIn"><i class="fas fa-user-circle fa-3x mr-5" ></i></div></router-link>
      <div v-if="user.loggedIn">
      <img :src="user.data.photoURL" style="max-width:50px; border-radius:100px">
      <span class="numerosencarrito d-none d-xl-block" >{{this.user.data.displayName}}</span>
      </div>
      
      <button class="btn btn-danger ml-3 mr-3" v-if="user.loggedIn"  @click.prevent="logout"> <span>Cerrar sesion</span></button>
      <router-link to="/carrito" v-if="user.loggedIn"><i class="fas fa-shopping-cart fa-3x mr-2 ml-3"></i></router-link>
      <p class="numerosencarrito" v-if="user.loggedIn" >{{carrito.length}}</p>
      
  </div>
</nav>
  </section>

</template>

<script lang="js">
  import Firebase from "firebase"
  import {db} from "../db.js"
  
  
  
  export default  {
    name: 'cabecera',
    props: [],
    
    data () {
      return {
         user:{
          loggedIn: false,
          data:{}
        },
        carrito:{},
        carritousuario:{},
        administrador:false
      }
    },
    methods: {
      logout(){
        Firebase.auth().signOut()
        
        this.$notify({
            group: 'notificacion',
            title: 'Hasta Pronto',
            text: 'Has cerrado sesión',
            type: 'warn'
            });
      },
      total(){
        return this.carrito.filter((producto) => producto.user === this.user.data.displayName).lenght
      }
    },
    mounted: function(){
      Firebase.auth().onAuthStateChanged(user => {
        if (user){
          this.user.loggedIn = true;
          this.user.data = user;
          if(user.email=="administrador@gmail.com"){
          this.administrador=true
          }
        }
        else{
          this.user.loggedIn = false;
          this.user.data = {};
          this.administrador=false;
        
          
        }
      })
    },
    
    computed: {
    carritofinal(){
        var carritoduplicado = this.carrito.filter((producto) => producto.user === this.user.data.displayName)
        
        return carritoduplicado.length
        
      }
      
  },
  firestore:{
      carrito:db.collection('carrito')
      
    }
}


</script>

<style lang="scss">
.cabecera{
  font-family: 'Bebas Neue', cursive;
  
}
.navbar{
  background-color: color(primary);
  color: color(terciary)
}
.fa-3x{
  color: grey;
  &:hover{
    color:white
  }
}

#logo{
  height: 70px;

  &:hover{
    filter: invert(98%) sepia(95%) saturate(15%) hue-rotate(182deg) brightness(104%)
  }
}
.numerosencarrito{
  color:white;
  margin: auto;
}



</style>





