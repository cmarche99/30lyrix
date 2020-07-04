<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">riguardo a noi</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<!--<template>
//    <md-app  id="app" md-mode="fixed-last">
//       <md-app-toolbar class="md-primary">
//         <div class="md-toolbar-row">
//          <span class="md-title">Sono bella</span>
//         </div> 
//         <div class="md-toolbar-row">
//             <md-button class="md-icon-button" @click="navOpen = true" v-if="!navOpen">
//             <md-icon>menu</md-icon>
//           </md-button>
//           <span>My Title</span>
//         </div> 
//       </md-app-toolbar> 
      
//       <md-app-drawer :md-active.sync="navOpen" md-persistent="full">
        
//         <md-toolbar class="md-transparent" md-elevation="0">
//           <span>Navigation</span>
//           <div class="md-toolbar-section-end">
//             <md-button class="md-icon-button" @click="navOpen = false">
//               <md-icon>keyboard_arrow_left</md-icon>
//             </md-button>
//           </div>
//         </md-toolbar>

//         <md-list>
//           <md-list-item>
//             <md-icon>move_to_inbox</md-icon>
//             <span class="md-list-item-text">Inbox</span>
//           </md-list-item>
//           <md-list-item>
//             <md-icon>send</md-icon>
//             <span class="md-list-item-text">Sent Mail</span>
//           </md-list-item>
//           <md-list-item>
//             <md-icon>delete</md-icon>
//             <span class="md-list-item-text">Trash</span>
//           </md-list-item>
//           <md-list-item>
//             <md-icon>error</md-icon>
//             <span class="md-list-item-text">Spam</span>
//           </md-list-item>
//           <md-list-item>
//             <md-icon>delete</md-icon>
//             <span class="md-list-item-text">Trash</span>
//           </md-list-item>
//           <md-list-item>
//             <md-icon>error</md-icon>
//             <span class="md-list-item-text">Spam</span>
//           </md-list-item>
//         </md-list>

//       </md-app-drawer> 
      
//       <md-app-content> 
//         <router-view></router-view>
//       </md-app-content> 
//   </md-app> 
// </template>

// <script>
// export default {
//   name: "App",
//   data: function(){
//     return{
//       navOpen: false
//     }
//   }
// };
// </script>

// <style>
// .md-app{
//   height: 100vh;
// }
// </style>-->
