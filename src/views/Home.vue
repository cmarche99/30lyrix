<template>
  <div>
    <md-card>
      <md-card-header>
        <h1>Qui puoi trovare molte canzoni e artisti</h1>
        <h3>Con un po' di fortuna ci saranno anche alcuni testi!</h3>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-90 md-small-size-100">
            <md-field md-layout="box" md-dense :md-counter="false">
              <label for="ricerca">Titolo e/o autore della canzone</label>
              <md-input type="text" v-model="ricerca" name="ricerca" id="ricerca" maxlength="800" @keyup.enter="cercaCanzone()"></md-input>
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
        <div class="md-layout md-gutter md-alignment-center" v-if="cisonorisultati == true">
          <cardCanzone v-for="traccia in risultati" :key="traccia.id_track" :canzone="traccia"></cardCanzone>
        </div>
        <md-empty-state
          v-if="cisonorisultati == false"
          class="md-accent"
          md-icon="sentiment_very_dissatisfied"
          md-label="Nessun risultato trovato"
          md-description="Ritenta e sarai più fortunat*!"
        >
        </md-empty-state>
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
      risultati: null,
      cisonorisultati: true
    };
  },
  methods: {
    cercaCanzone() {
      axios
        .get(
          "https://api.happi.dev/v1/music?q=" +
            this.ricerca +
            "&limit=21&apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH&type="
        )
        .then(data => {
          // console.log ('successo');
          // console.log(data);
          this.risultati = data.data.result;
          console.log(this.risultati);
          if (this.risultati == 0) {
            this.cisonorisultati = false;
            console.log("ho fatto cisonoriusltati");
          } else {
            this.cisonorisultati = true;
          }
        })
        .catch(e => {
          console.error("Qualcosa è andato storto!");
          console.log(e);
        });
    },
    // cisonoRisultati() {
    //   if (this.risultati == 0) {
    //     this.cisonorisultati = false;
    //     console.log("ho fatto cisonoriusltati");
    //   } else {
    //     this.cisonorisultati = true;
    //   }
    // }
  }
};
</script>

<style>
.md-layout {
  width: 90%;
}
md-card-content {
  padding: 5%;
}
h1,
h3 {
  font-weight: lighter;
}
</style>