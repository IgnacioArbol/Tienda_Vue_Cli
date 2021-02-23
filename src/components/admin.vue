<template lang="html">

  <section class="private">
    <h1 class="titulo mt-5 mb-3">Cambiar productos</h1>
    
    <div class="d-flex justify-content-between productos" v-for="producto in productos" v-bind:key="producto.id">
      <img class="foto" :src="producto.foto">
      <div>
      <h3>{{producto.nombre}}</h3>
      <p>Stock: {{producto.stock}} unidades</p>
      <p>Precio: {{producto.precio}}€</p>
      </div>
      <button class="btn boton" @click="fmostrar(producto.id)">Mostrar Más</button>
       
      <div v-if="mostrar==producto.id">
      <label>quieres cambiar el nombre</label>
      <input type="text" v-model="nombre">
      <br>
      <label>¿Qué precio quieres poner?</label>
      <input type="text" v-model.number="precio">
      <br>
      <label>cuantos quieres meter en el stock</label>
      <input type="number" v-model.number="cantidad" >

      <button class="btn btn-success" @click="insertar(producto.id,producto.stock)" type="summit">añadir</button>
      <button class="btn btn-danger" @click="eliminar(producto.id)">eliminar</button>
      </div>
    </div>
    <button class="boton btn align-self-center" @click="fmostrarnuevo()">Añadir producto nuevo</button>
    <div v-if="mostrarnuevo==true" class="nuevoproducto">
        <label class="mt-5">¿Comó quieres que se llame?</label>
        <input type="text" v-model="nombre">
        <br>
        <label>¿Cuál es su descripción?</label>
        <input type="text" v-model="descripcion">
        <br>
        <label>¿Cuál es su imagen?</label>
        <input type="text" v-model="imagen" >
        <br>
        <label>¿Cuánto quieres que cueste?</label>
        <input type="number" v-model.number="precio" value="0" min="0">
        <br>
        <label>¿Cuánto tendrás de stock inicial?</label>
        <input class="mb-3" type="number" v-model.number="stock" value="0" min="0">
        <br>
        <button class="btn boton" @click="añadirnuevo()"> Insertar</button>
    </div>
  </section>

</template>

<script lang="js">

  import Firebase from 'firebase'
  import{db} from '../db.js'

  export default  {
    name: 'private',
    props: [],
    
    data () {
       return {
        user:{
          loggedIn: false,
          data:{}
        },
        productos:{},
        cantidad:0,
        precio:0,
        nombre:"",
        imagen:"",
        stock:0,
        descripcion:"",
        mostrar: "",
        mostrarnuevo: ""
      }
    },
    methods: {
        eliminar(id){
          db.collection('productos').doc(id).delete()
        },
        insertar(id,stock){
          db.collection('productos').doc(id).update({
            stock: (stock+this.cantidad)
          })
          if(this.nombre!=""){
            db.collection('productos').doc(id).update({
            nombre: this.nombre
          })
          }
           if(this.precio!=0){
            db.collection('productos').doc(id).update({
            precio: this.precio
          })
          }
          this.nombre="";
          this.precio=0;
          this.cantidad=0
          
        },
        fmostrar(id){
          if(this.mostrar!=id){
          this.mostrar=id;
            this.nombre="";
            this.precio=0;
            this.cantidad=0
            
          }else{
              this.nombre="";
              this.precio=0;
              this.cantidad=0;
            this.mostrar=""
          }
        },
        fmostrarnuevo(){
          if(this.mostrarnuevo==false){
          this.mostrarnuevo=true;
          }else{
            this.mostrarnuevo=false;
          }
        },
        añadirnuevo(){
          db.collection('productos').doc().set({
            nombre:this.nombre,
            descripcion: this.descripcion,
            foto:this.imagen,
            precio:this.precio,
            stock: this.stock,
          })
        },
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

    },
    firestore:{
      productos:db.collection('productos')
      
    }
}


</script>

<style lang="scss">
.foto{
  height: 150px;
  max-width: 150px;
}
.nuevoproducto{
  margin: auto;
  width: 40%;
  background-color: color(primary);
  border: 2px solid grey;
  
}
.productos{
  background-color: color(primary);
  border: 2px solid grey;
}
</style>