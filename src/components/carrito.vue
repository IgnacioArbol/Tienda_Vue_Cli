<template lang="html">

  <section class="carrito">
    <h1 class="mt-5 mb-3 titulo">Tu Carrito</h1>
    <div class=" contenedorcarrito d-flex justify-content-between align-items-center mr-5 ml-5 pl-2 pr-2" v-for="producto in carritofinal" v-bind:key="producto.id">
      <img class="imagen" v-bind:src="producto.photo">
      <div class="d-flex flex-column mr-5">
      <h3 class="nombre">{{producto.name}}</h3>
      
    
      <p class="precio">total a pagar= {{producto.price*producto.quantity}}€</p>
      </div>
      
      <input class="" v-model.number="producto.quantity" type="number" :max="producto.stock" min="0" value="1">
      <div class="d-flex">
      <button class="btn btn-danger " @click="eliminar(producto.id)">eliminar</button>
      <button class="btn btn-success" @click="comprar(producto.productid,producto.quantity,producto.stock,producto.id)">comprar</button>
      </div>
      
      
      
    </div>
      
  </section>

</template>

<script lang="js">
  import Firebase from 'firebase'
  import{db} from '../db.js'

  

  export default  {
    name: 'carrito',
    props: [],
    
    data () {
      return {
        carrito:{},
        total: 0,
        user:{
          loggedIn: false,
          data:{}
        },
        cantidad:0,
        carritousuario:{}
      }
    },
    methods: {
      calcular(array){
        for(let i=0; i<array.lenght; i++){
          this.total=this.total+(array[i].price*array[i].quantity) 
        }
        
      },
      priceSum(){
        return this.carrito.filter((producto) => producto.user === this.user.data.displayName).reduce((prev,cur) => prev + cur.total,0)
    },
      eliminar(id){
        
        db.collection('carrito').doc(id).delete()
        this.$notify({
            group: 'notificacion',
            title: 'Vaya',
            text: 'Has borrado el producto de tu carrito :(',
            type: 'warn'
            });
        
      },
      comprar(idproducto,cantidad,stock,id){
        if(cantidad<stock){
        db.collection('productos').doc(idproducto).update({
          stock: (stock-cantidad)
          
        })
        this.$notify({
            group: 'notificacion',
            title: 'Feliciades',
            text: 'Has comprado el producto correctamente',
            type: 'success'
            });
        db.collection('carrito').doc(id).delete()
      }
      else{
        this.$notify({
            group: 'notificacion',
            title: 'Creo que no puedes hacer eso',
            text: 'NO se ha podido realizar la compra por que no nos queda stock para satisfacer sus necesidades',
            type: 'danger'
            });
      }
      }
    },
    computed: {
      carritofinal(){
        var carritoduplicado = this.carrito.filter((producto) => producto.user === this.user.data.displayName)
        
        return carritoduplicado
        
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
    firestore:{
      carrito: db.collection('carrito'),
      productos: db.collection('productos'),
      
    }
}


</script>
<style lang="scss">
.contenedorcarrito{
  border:1px solid color(primary);
  background-color: color(primary);
    &:hover{
      transition: 0.5s;
      background-color: azure;
  }
  height: 200px;
  & .nombre{
    width: 300px;
  }
}
.imagen{
    height: 150px;
    max-height: 150px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

