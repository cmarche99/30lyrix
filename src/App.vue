<template>
   <md-app  id="App" md-mode="fixed-last">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section start">
         <md-button>
         <span class="md-title">30lyrix</span>
         </md-button>
        </div> 
        <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
            <md-icon>favorite</md-icon>
          </md-button>
        </div> 
      </md-app-toolbar> 
      
      <md-app-content> 
        <router-view></router-view>
      </md-app-content> 
  </md-app> 
</template>

<script>
import axios from 'axios'


export default {
  data: function() {
      return {
      prova: 'ciao'
    }
  },
  // created(){
  //   this.fetch();
  // },
  // methods: {
  //   fetch(){
  //     axios.get('https://api.happi.dev/v1/music?q=umbrella%20rihanna&limit=&apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH&type=')
  //     .then((data) => {
  //       console.log ('successo');
  //       console.log(data);
  //       this.prova = data.data.result[0].album;
  //     }).catch(() =>{
  //       console.error('schifo');
  //     });
  //   }
  // }
}

</script>