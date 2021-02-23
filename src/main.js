import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


library.add(faFontAwesome)

library.add(fas)
library.add(fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)


import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { firestorePlugin } from 'vuefire'
import router from './router'
Vue.use(firestorePlugin)

import Notifications from 'vue-notification'
Vue.use(Notifications)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
