<template>
  <md-card>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">Smart playlist</div>
        <div
          class="md-subhead"
        >Ecco una playlist creata in base allo stile di {{this.$route.params.artist}}!</div>
      </md-card-header-text>
    </md-card-header>
    <md-card-content>
      <md-list v-for="traccia in playlist" :key="traccia.id_track">
        <md-list-item
          :to=" '/canzone/' + traccia.id_artist + '/' + traccia.id_album + '/' + traccia.id_track "
        >
          <md-avatar class="md-large">
            <img :src="traccia.cover" />
          </md-avatar>
          <div class="md-list-item-text">
            <span>{{traccia.track}}</span>
            <span>
              <router-link :to="'/artista/' + traccia.id_artist">{{traccia.artist}}</router-link>
            </span>
          </div>
          <md-button class="md-icon-button md-list-action">
            <md-icon>favorite_border</md-icon>
          </md-button>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      playlist: null
    };
  },
  created() {
    this.playlistArtista();
  },
  methods: {
    playlistArtista() {
      axios
        .get(
          "https://api.happi.dev/v1/music/artists/" +
            this.$route.params.id_artist +
            "/smart-playlist?apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH"
        )
        .then(data => {
          console.log("abbiamo trovato questa playlist");
          console.log(data);
          this.playlist = data.data.result;
        })
        .catch(e => {
          console.error("qualcosa è andato storto");
          console.log(e);
        });
    }
  }
};
</script>

<style>
img {
  height: 50px;
  width: 50 px;
}
</style>