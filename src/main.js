import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueMaterial from 'vue-material'; 

// import "vue-material/dist/vue-material.min.css"; 
// import "vue-material/dist/theme/default.css"; 

Vue.config.productionTip = false

Vue.use(VueMaterial); 
Vue.use(VueRouter);

// const router = new VueRouter({
//   mode: "history",
//   routes: [
//     { path: '/home', component: Home },
//     { path: './page1', component: Page1 },
//     { path: '/', redirect: '/home' }
//   ]
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
