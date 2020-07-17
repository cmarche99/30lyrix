<template>
  <div>
    <h1>Qui puoi trovare molte canzoni e artisti</h1>
    <h3>Con un po' di fortuna ci saranno anche alcuni testi!</h3>
    
    <!-- barra di ricerca per cercare una canzone e button di invio -->
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-90 md-small-size-100">
        <md-field md-layout="box" md-dense :md-counter="false">
          <label for="ricerca">Titolo e/o autore della canzone</label>
          <md-input
            type="text"
            v-model="ricerca"
            name="ricerca"
            id="ricerca"
            maxlength="800"
            @keyup.enter="cercaCanzone()"
          ></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-10">
        <md-button
          class="md-raised md-primary"
          @click="cercaCanzone()"
          type="submit"
          display="inline"
        >Cerca</md-button>
      </div>
    </div>

    <br />

    <!-- mostra i risultati della ricerca richiamando il component cardCanzone (solo se ci sono risultati) -->
    <div class="md-layout md-gutter md-alignment-center" v-if="cisonorisultati == true">
      <cardCanzone v-for="traccia in risultati" :key="traccia.id_track" :canzone="traccia"></cardCanzone>
    </div>
    
    <!-- mostra l'empty state se non ci sono risultati -->
    <md-empty-state
      v-if="cisonorisultati == false"
      class="md-accent"
      md-icon="sentiment_very_dissatisfied"
      md-label="Nessun risultato trovato"
      md-description="Ritenta e sarai più fortunat*!"
    ></md-empty-state>
  </div>
</template>

<script>
import axios from "axios";
import cardCanzone from "../components/cardCanzone";

export default {
  components: {
    cardCanzone
  },
  data: function() {
    return {
      ricerca: '', //variabile che si imposta nell'input di ricerca
      risultati: [], //il risultato della chiamata che viene passato al componente
      cisonorisultati: true //boolean che mostra le card se è true o l'empty state se è false
    };
  },
  methods: {
    
    // chiamata all'API usando la var ricerca e scrive la risposta nella variabile risultati
    cercaCanzone() {
      axios
        .get(
          "https://api.happi.dev/v1/music?q=" +
            this.ricerca +
            "&limit=21&apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH&type="
        )
        .then(data => {
          this.risultati = data.data.result;
          // imposta a true o false la var cisonorisultati
          if (this.risultati == 0) {
            this.cisonorisultati = false;
            console.log("non ho trovato risultati di ricerca");
          } else {
            this.cisonorisultati = true;
          }
        })
        .catch(e => {
          console.error("Qualcosa è andato storto nella ricerca!");
          console.log(e);
        });
    }
  }
};
</script>

<style>
h1,
h3 {
  font-weight: lighter;
}
h1 {
  line-height: 110%;
}
</style>