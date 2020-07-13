<template>
  <div>
    <md-card>
      <md-card-header>
      <h2>Qui puoi trovare tante cose belle sulle canzoni e i loro autori...</h2>
    <p>Cerca la canzone che ti interessa!</p>
    </md-card-header>
    <md-card-content>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-90 md-xsmall-size-100">
        <md-field md-layout="box" md-dense :md-counter="false">
          <label for="ricerca">Titolo e/o autore della canzone</label>
          <md-input type="text" v-model="ricerca" name="ricerca" id="ricerca" maxlength="800"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-10">
        <md-button
          class="md-raised md-primary"
          @click="cercaCanzone()"
          type="submit"
          display="inline"
        >
        Cerca
        </md-button>
      </div>
    </div>

    <br />
    <br />
    <div class="md-layout md-gutter md-alignment-center">
      <cardCanzone v-for="traccia in risultati" :key="traccia.id_track" :canzone="traccia"></cardCanzone>
    </div>
    </md-card-content>
    </md-card>
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
      ricerca: null,
      risultati: null
    };
  },
  methods: {
    cercaCanzone() {
      axios
        .get(
          "https://api.happi.dev/v1/music?q=" +
            this.ricerca +
            "&limit=30&apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH&type="
        )
        .then(data => {
          // console.log ('successo');
          // console.log(data);
          this.risultati = data.data.result;
        })
        .catch(e => {
          console.error("Qualcosa è andato storto! ");
          console.log(e);
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
</style>