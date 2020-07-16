<template>
  <div>
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
        <md-list v-for="(traccia, i) in playlist" :key="traccia.id_track">
          <md-list-item>
            <md-avatar class="md-large">
              <img :src="traccia.cover" />
            </md-avatar>
            <div class="md-list-item-text">
              <router-link
                :to=" '/canzone/' + traccia.id_artist + '/' + traccia.id_album + '/' + traccia.id_track "
              >{{traccia.track}}</router-link>
              <span>
                <router-link :to="'/artista/' + traccia.id_artist">{{traccia.artist}}</router-link>
              </span>
            </div>
            <md-button 
              class="md-icon-button md-list-action"
              @click="isLogin(); aprireDialogo(traccia, i)"
              v-if="traccia.cuorenero == false"
            >
              <md-icon>favorite_border</md-icon>
              <md-tooltip md-delay="200" md-direction="left">Aggiungi ai preferiti</md-tooltip>
            </md-button>

            <md-button
              class="md-icon-button md-list-action"
              @click.stop="rimuoviPreferiti(traccia, i)"
              v-if="traccia.cuorenero == true"
            >
              <md-icon>favorite</md-icon>
              <md-tooltip md-delay="200" md-direction="left">Rimuovi dai preferiti</md-tooltip>
            </md-button>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
        </md-list>
      </md-card-content>
    </md-card>
    <md-snackbar :md-duration="2000" :md-active.sync="preferiti" md-persistent>
      <span>Aggiunto ai preferiti!</span>
      <md-button class="md-primary" :to=" '/preferiti/' ">Vedi i preferiti</md-button>
    </md-snackbar>
    <md-snackbar :md-duration="2000" :md-active.sync="rimosso" md-persistent>
      <span>Rimosso dai preferiti</span>
    </md-snackbar>
    <md-dialog-alert
      :md-active.sync="loggati"
      md-title="Azione non permessa"
      md-content="Per aggiungere una canzone ai preferiti devi prima essere loggato"
      md-confirm-text="ok"
    />
  </div>
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
      loggati: undefined,
      //cuorenero: false,
      rimosso: undefined
    };
  },
  created() {
    this.playlistArtista();
    // this.vediPreferiti();
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

          this.addCuorenero();
          this.playlist.forEach((traccia, i) => {
            this.vediPreferiti(traccia, i);
          });
        })
        .catch(e => {
          console.error("qualcosa è andato storto nel caricare la playlist");
          console.log(e);
        });
    },
    isLogin() {
      this.islog = !!localStorage.getItem("username");
    },
    aprireDialogo(traccia, i) {
      // return islog= !!localStorage.getItem("username");
      if (this.islog == true) {
        this.preferiti = true;
        this.loggati = false;
        console.log(this.preferiti);
        this.addPreferiti(traccia);
      } else {
        this.loggati = true;
        this.preferiti = false;
      }
    },
    addPreferiti(traccia, i) {
      dataService
        .setPreferiti(
          traccia.id_track,
          traccia.track,
          traccia.id_artist,
          traccia.artist,
          traccia.id_album,
          traccia.cover
        )
        .then(preferiti => {
          console.log("successo");
          console.log(preferiti);
          this.$set(traccia, "cuorenero", true);
        })
        .catch(e => {
          console.error("Qualcosa è andato storto in addPreferiti! ");
          console.log(e);
        });
    },
    rimuoviPreferiti(traccia, i) {
      dataService.removePreferiti(traccia.id_track).then(() => {
        this.$set(this.playlist[i], "cuorenero", false);
        this.rimosso = true;
      });
    },
    vediPreferiti(traccia, i) {
      dataService.getPreferiti(localStorage.getItem("username")).then(data => {
        data.forEach(doc => {
          console.log(doc.data());
          console.log("pappaero non mi stampo");
          if (doc.data().id_track == traccia.id_track) {
            this.$set(this.playlist[i], "cuorenero", true);
            console.log("ho fatto il metodo VEDIPREFERITI");
          }
        });

        console.log(this.playlist);
      });
    },
    addCuorenero() {
      this.playlist.forEach(traccia => {
        this.$set(traccia, "cuorenero", false);
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