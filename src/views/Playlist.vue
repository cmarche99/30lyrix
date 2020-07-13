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
        <md-list-item>
          <md-avatar class="md-large">
            <img :src="traccia.cover" />
          </md-avatar>
          <div class="md-list-item-text">
            <router-link :to=" '/canzone/' + traccia.id_artist + '/' + traccia.id_album + '/' + traccia.id_track ">{{traccia.track}}</router-link>
            <span>
              <router-link :to="'/artista/' + traccia.id_artist">{{traccia.artist}}</router-link>
            </span>
          </div>
          <md-button class="md-icon-button md-list-action" @click="isLogin(); aprireDialogo();">
            <md-icon>favorite_border</md-icon>
            <md-tooltip md-delay="200" md-direction="left">Aggiungi ai preferiti</md-tooltip>
          </md-button>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
        <md-snackbar :md-duration="4000" :md-active.sync="preferiti" md-persistent>
          <span>Aggiunto ai preferiti!</span>
          <md-button class="md-primary" :to=" '/preferiti/' ">Vedi i preferiti</md-button>
        </md-snackbar>

        <md-dialog-alert
          :md-active.sync="loggati"
          md-title="Azione non permessa"
          md-content="Per aggiungere una canzone ai preferiti devi prima essere loggato"
          md-confirm-text="ok"
        />
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script>
import axios from "axios";
import dataService from "../dataService";

export default {
  data: function() {
    return {
      playlist: null,
      islog: undefined,
      preferiti: undefined,
      loggati: undefined
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
    },
    isLogin() {
      this.islog = !!localStorage.getItem("username");
    },
    aprireDialogo() {
      // return islog= !!localStorage.getItem("username");
      if (this.islog == true) {
        this.preferiti = true;
        this.loggati = false;
        return this.addPreferiti();
      } else {
        this.loggati = true;
        this.preferiti = false;
      }
    },
    addPreferiti() {
      dataService
        .setPreferiti(
          this.playlist.traccia.id_track,
          this.playlist.traccia.id_artist,
          this.playlist.traccia.id_album
        )
        .then(preferiti => {
          console.log("successo");
          console.log(preferiti);
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
img {
  height: 50px;
  width: 50 px;
}
</style>