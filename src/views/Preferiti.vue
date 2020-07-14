<template>
  <div>
    <div v-if="cisono == true" class="md-layout md-gutter md-alignment-center">
      <cardCanzone v-for="preferita in preferite" :key="preferita.id_track" :canzone="preferita"></cardCanzone>
    </div>
    <md-empty-state
      v-if="cisono == false"
      class="md-accent"
      md-icon="error_outline"
      md-label="Nessun preferito da mostrare"
      md-description="Per aggiungere i prefertiti seleziona una canzione"
    >
      <md-button class="md-primary md-raised" :to=" '/home'">Cerca una canzone</md-button>
    </md-empty-state>
  </div>
</template>

<script>
import dataService from "../dataService";
import cardCanzone from "../components/cardCanzone";

export default {
  components: {
    cardCanzone
  },
  data: function() {
    return {
      cisono: false,
      preferite: []
    };
  },
  created() {
    this.cisonoPreferiti();
  },
  methods: {
    cisonoPreferiti() {
      dataService.getPreferiti(localStorage.getItem("username")).then(data => {
        data.forEach(doc => {
          if (doc.data == 0) {
            this.cisono = false;
          } else {
            this.cisono = true;
            this.preferite.push(doc.data());
          }
          console.log(this.preferite);
        });
      });
    }
    // cisonoPreferiti() {
    //   dataService.getPreferiti(localStorage.getItem("username")).then(data => {
    //       if (data == 0) {
    //         this.cisono = false;
    //       }
    //       else (data.forEach (doc => {
    //         var preferite = '';
    //         this.preferite.push(doc.data);
    //         console.log(this.preferite);

    //       })
    //       )
    //     });
    // }
  }
};
</script>

<style>
.md-layout {
  width: 100%;
}
md-card-content {
  padding: 5%;
}
</style>