
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card" v-if="!user.loggedIn">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                    
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn boton">Login</button>
                </div>
              </div>
              
            </form>
            
            <div class="mt-5">
                  <button class="btn boton ml-3 mr-3" @click="google">Google</button>
                  <button class="btn boton ml-3 mr-3" @click="twitter">Twitter</button>
                  <button class="btn boton ml-3 mr-3" @click="facebook">Facebook</button>
                </div>
          </div>
        </div>
        <div v-else> <h1>Se ha iniciado sesión perfectamente</h1></div>
      </div>
    </div>
    <p>No estas registrado?</p> <router-link to="/registrar"><button class="btn btn-dark">registrate</button></router-link>
  </div>
</template>

<script>
  import Firebase from "firebase";
  import firebase from "../db.js"
  
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
        
      },
      user:{
          loggedIn: false,
          data:{}
        },
      
      error: null
    };
  },
  methods: {
    submit() {
     Firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ name: "home" });
          this.$notify({
            group: 'notificacion',
            title: 'Important message',
            text: 'Te has logueado correctamente',
            type: 'success'
            });
          console.log(data);
        })
        .catch(err => {
          this.error = err.message;
        })
    },
    google(){
        firebase.google();
        this.$router.replace({ name: "home" });
        this.$notify({
          group: 'notificacion',
          title: 'Important message',
          text: 'Te has logueado correctamente con Google',
          type: 'success'
          });
        
      },
      twitter(){
        firebase.twitter();
        this.$router.replace({ name: "home" });
        this.$notify({
          group: 'notificacion',
          title: 'Important message',
          text: 'Te has logueado correctamente con Twitter',
          type: 'success'
          });
        
      },
      facebook(){
        firebase.facebook();
        this.$router.replace({ name: "home" });
        this.$notify({
          group: 'notificacion',
          title: 'Important message',
          text: 'Te has logueado correctamente con Facebook',
          type: 'success'
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
    }
};
</script>