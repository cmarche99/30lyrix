import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import "vue-material/dist/vue-material.min.css"; 
import "vue-material/dist/theme/default.css"; 

import Home from "./views/Home";

Vue.use(VueMaterial);
Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes: [
      { path: '/home', component: Home },
    // { path: './page1', component: Page1 },
      { path: '/', redirect: '/home' }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);



