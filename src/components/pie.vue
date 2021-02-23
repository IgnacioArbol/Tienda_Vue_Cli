<template lang="html">

  <section class="pie">
    
    <div class="container">
     
    </div>
    
    <div class="container">
      <a href="https://www.instagram.com/nachete_gomez/?hl=en" class="mr-2 ml-2"><img class="redessociales" src="../assets/instagram.png"></a>
      <a href="https://github.com/IgnacioArbol" class="mr-2 ml-2"><img class="redessociales" src="../assets/github.png"></a>
      <a href=" " class="mr-2 ml-2"><img class="redessociales" src="../assets/facebook.png"></a>
    </div>
    
    <h3>Nos puedes seguir en nuestras redes sociales que te dejamos aqui</h3>
    
    <h4>Pagina no oficial realizada por Ignacio Árbol</h4>
    
    
  </section>

</template>

<script lang="js">

  export default  {
    name: 'pie',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style lang="scss">
  .pie {
    color:white;
    margin-top: 30px;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    background-color: color(primary);
  }
  .redessociales{
    height: 50px;
    margin-bottom: 40px;
    border-radius: 100%;
    &:hover{
      box-shadow: 5px 2px #070707;
    }
  }

</style>
