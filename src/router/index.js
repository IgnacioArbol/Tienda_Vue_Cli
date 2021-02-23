import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/login'
import Registrar from '../components/registrar'
import home from '../components/home'
import carrito from '../components/carrito'
import firebase from 'firebase'
import admin from '../components/admin'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registrar',
        name: 'registrar',
        component: Registrar
    },
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/carrito',
        name: 'carrito',
        component: carrito,
        meta:{requiresAuth:true}

    },
    {
        path: '/admin',
        name: 'admin',
        component: admin,
        meta:{requiresAuth:true}

    }

    
]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(data => data.meta.requiresAuth)){
      const user = firebase.auth().currentUser;
      if (user) {
        next()
      }else{
         next({
           name: 'login'
         })
       }
      }else{
        next();
      }
   })
export default router