<template lang="html">

  <section class="pie">
    
    <div class="container">
     
    </div>
    
    <div class="container">
      <font-awesome-icon :icon="['fab', 'twitter']"  />
      <font-awesome-icon :icon="['fab', 'facebook']"  />
      <font-awesome-icon :icon="['fab', 'github']" size="xl"  />
    </div>
    <h1>pie Component</h1>
    
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
    margin-top: 30px;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    background-color: color(primary);
  }


</style>
