<template>
  <md-card class="md-layout-item">
    <md-card-header>
      <md-card-header-text>
        <span class="md-title">{{artista.artist}}</span>
      </md-card-header-text>
      <md-card-media md-medium>
        <img :src="artista.cover" />
      </md-card-media>
    </md-card-header>
    <md-card-content>
      <md-table>
        <!-- se l'API fornisce il paese di provenienza dell'artista, lo visualizza nella table -->
        <md-table-row v-if="paese">
          <md-table-cell>
            <b>Paese</b>
          </md-table-cell>
          <md-table-cell>{{artista.country}}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell>
            <b>Spotify</b>
          </md-table-cell>
          <md-table-cell>
            <!-- mette a disposizione il link per la ricerca dell'artista su spotify -->
            <a :href="spotify" target="_blank" rel="noopener noreferrer">{{spotify}}</a>
          </md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell>
            <b>Maggiori informazioni</b>
          </md-table-cell>
          <!-- mette a disposizione il link per la ricerca di info su google -->
          <md-table-cell>
            <a :href="google" target="_blank" rel="noopener noreferrer">{{google}}</a>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-card-content>
    <md-card-actions>
      <!-- button per il collegamento alla smart playlist (utilizza i parametri artist e id_artist) -->
      <md-button
        class="md-primary"
        :to=" '/playlist/' + artista.artist + '/' + artista.id_artist"
      >Smart playlist</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      artista: '',//variabile
      spotify: null,//variabile settata dalla chiamata api per avere il link alla ricerca di spotify
      google: null,//variabile settata dalla chiamata api per avere il link alla ricerca di google
      paese: false,//settata a true solo se il paese esiste nell'api
      albums: null
    };
  },
  created() {
    this.infoArtista();
  },
  methods: {

    // esegue la chiamata con il param id_artist della route
    infoArtista() {
      axios
        .get(
          "https://api.happi.dev/v1/music/artists/" +
            this.$route.params.id_artist +
            "?apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH"
        )
        .then(data => {
          console.log("abbiamo trovato questo artista");
          console.log(data);

          // scrive i risultati in var artista, spotify e google
          this.artista = data.data.result;
          this.spotify =
            "https://open.spotify.com/search/" + data.data.result.artist;
          this.google = "https://google.com/search?q=" + data.data.result.mbid;

          console.log(this.spotify);

          // setta a true var paese quando il campo non è vuoto
          if (this.artista.country != "") {
            this.paese = true;
          }
        })
        .catch(e => {
          console.error("qualcosa è andato storto canzone");
          console.log(e);
        });
    }
  }
};
</script>