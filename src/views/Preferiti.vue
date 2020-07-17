<template>
  <div class="md-alignment-center">
    <h1 class="headline">I tuoi preferiti</h1>

    <!-- mostra le canzoni aggiunte ai preferiti richiamando il component cardCanzone (solo se sono state già aggiunte) -->
    <div v-if="cisono == true" class="md-layout md-gutter">
      <cardCanzone v-for="preferita in preferite" :key="preferita.id_track" :canzone="preferita"></cardCanzone>
    </div>

    <!-- mostra l'empty state se non ci sono ancora canzoni aggiunte, con button per tornare alla pagina Home -->
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
      cisono: undefined, //variabile boolena: se true vengono mostrati i preferiti, se false viene mostrato l'empty state
      preferite: [] // variabile passata al componente, settata in base ai risultati della chiamata al db
    };
  },
  created() {
    this.cisonoPreferiti();
  },
  methods: {

    //controllo delle canzoni salvate associate allo username
    cisonoPreferiti() {
      dataService.getPreferiti(localStorage.getItem("username")).then(data => {
        //impostata una variabile che aumenta in base al numero di canzoni salvate trovate nel doc, stampandole?? nella var preferite
        var contatore = 0;
        data.forEach(doc => {
          contatore += 1;
          this.preferite.push(doc.data());
        });

        //la var cisono viene settata rispetto al valore numerico che assume la var contatore
        if (contatore == 0) {
          this.cisono = false;
        } else {
          this.cisono = true;
        }
      });
    }
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
h1 {
  font-weight: lighter;
}
</style>