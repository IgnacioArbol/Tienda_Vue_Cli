<template lang="html">

  <section class="home">
    <h1 class="titulo mt-5 mb-3">Nuestro catálogo</h1>
    <div class="contenedor d-flex flex-row flex-wrap justify-content-around ml-5 mr-5 ">
    <div class="producto pr-2 pl-2 mt-3 mb-3 mr-2 ml-2" v-for="producto in productos" v-bind:key="producto.id">
      <div>
      <img class="imagen img-top mt-2" v-bind:src="producto.foto">
      <img class="imagen img-bot mt-2" v-bind:src="producto.foto2">
      </div>
      <h4 class="mt-3">{{producto.nombre}}</h4>
      <p>{{producto.descripcion}}</p>
      <p class="precio">{{producto.precio}}€</p>
      <p> stock: {{producto.stock}}</p>
      
      <button class=" btn boton" v-if="producto.stock>0&&user.loggedIn" @click="añadir(producto.nombre,producto.foto,producto.precio,producto.id,producto.stock)">Comprar</button>
      
      
    </div>
    </div>
    
  </section>

</template>

<script lang="js">

 import{db} from '../db.js'
 
 import Firebase from 'firebase'

  export default  {
    name: 'home', 
    props: [],
    
    data () {
      return {
        productos:{},
        user:{
          loggedIn: false,
          data:{}
        },
        
        
      }
    },
    methods: {
      añadir(nombre,foto,precio,id,stock){
        db.collection("carrito").doc(nombre+this.user.data.email).set({
          name: nombre,
          price: precio,
          photo: foto,
          quantity: 1,
          productid: id,
          stock: stock,
          user: this.user.data.displayName
        })
        .then(() => {
          this.$notify({
            group: 'notificacion',
            title: 'Bien',
            text: 'Has añadido un producto a tu carrito',
            type: 'success'
            });
        })
        .catch((error) => {
          this.$notify({
            group: 'notificacion',
            title: 'vaya has tenido un error',
            text: error,
            type: 'warn'
            });
        });

       
      }
      
    },
    mounted: function(){
      Firebase.auth().onAuthStateChanged(user => {
        if (user){
          this.user.loggedIn = true;
          this.user.data = user;
          
        }
        else{
          this.user.loggedIn = false;
          this.user.data = {};
          
        }
      })
    },
    computed: {
    logueado(){
      return this.user.loggedIn
    }
    
  },
    firestore:{
      productos:db.collection('productos')
      
    }
}


</script>
<style lang="scss">
.titulo{
  background-color: rgb(247, 244, 244);
  font-family: 'Bebas Neue', cursive;
  font-size: 50px;
}

.producto{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width:300px ;
  
  background-color: color(primary);
  border: 2px solid color(terciary);
  border-radius: 10px;
  &:hover{
    background-color: color(secondary);
  }
  
  
}
.precio{
  color: color(quaternary);
  font-weight: bold;
  font-size: 20px
}
.imagen{
    height: 150px;
    max-height: 150px;
    margin-left: auto;
    margin-right: auto;
  }
.boton{
  
  margin-bottom: 10px;
  background-color: color(quaternary);
  &:hover{
    background-color: orange;
  }
  }
.img-top {
  @include imagen-top
}

.img-bot {
  @include imagen-bot
}

.producto:hover .img-top {
        opacity:0;
        transition:1s;

}
</style>

