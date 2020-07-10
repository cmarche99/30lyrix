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
            <a :href="spotify" target="_blank" rel="noopener noreferrer">{{spotify}}</a>
          </md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell>
            <b>Maggiori informazioni</b>
          </md-table-cell>
          <md-table-cell>
            <a :href="google" target="_blank" rel="noopener noreferrer">{{google}}</a>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-card-content>
    <md-card-actions>
      <md-button
        class="md-raised md-primary"
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
      artista: null,
      spotify: null,
      google: null,
      paese: false,
      albums: null
    };
  },
  created() {
    this.infoArtista();
    this.albumArtista();
  },
  methods: {
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

          this.artista = data.data.result;
          this.spotify =
            "https://open.spotify.com/search/" + data.data.result.artist;
          this.google = "https://google.com/search?q=" + data.data.result.mbid;

          console.log(this.spotify);

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