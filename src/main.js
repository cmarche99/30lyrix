import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import axios from 'axios'

import "vue-material/dist/vue-material.min.css"; 
import "vue-material/dist/theme/default.css"; 

import Home from "./views/Home";
import Canzone from "./views/Canzone";
import Artista from "./views/Artista";
import Playlist from "./views/Playlist";
import Preferiti from "./views/Preferiti";

Vue.use(VueMaterial);
Vue.use(VueRouter);
// Vue.use(axios);


Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes: [
      { path: '/home', component: Home },
      { path: '/canzone/:id_artist/:id_album/:id_track', component: Canzone },
      { path: '/', redirect: '/home' },
      { path: '/artista/:id_artist', component: Artista},
      { path: '/playlist/:artist/:id_artist', component: Playlist},
      { path: '/preferiti', component: Preferiti}
  ]
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// var filter = function(text, length, clamp){
//   clamp = clamp || '...';
//   var node = document.createElement('div');
//   node.innerHTML = text;
//   var content = node.textContent;
//   return content.length > length ? content.slice(0, length) + clamp : content;
// };

// Vue.filter('truncate', filter);



