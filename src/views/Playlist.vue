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
        <!-- ciclo che presenta tutte le tracce nelle righe -->
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

           <div v-if="islog == true"> 

            <!-- button (mostrato se cuorenero è false) per mettere nei preferiti la canzone -->

            <md-button
              class="md-icon-button md-list-action"
              @click="isLogin(); controlloPreferiti(traccia, i)"
              v-if="traccia.cuorenero == false"
            >
              <md-icon>favorite_border</md-icon>
              <md-tooltip md-delay="200" md-direction="left">Aggiungi ai preferiti</md-tooltip>
            </md-button>

            <!-- button (mostrato se cuorenero è true) per rimuovere dai preferiti la canzone -->
            <md-button

              class="md-icon-button md-list-action"
              @click.stop="rimuoviPreferiti(traccia, i)"
              v-if="traccia.cuorenero == true"
            >
              <md-icon>favorite</md-icon>
              <md-tooltip md-delay="200" md-direction="left">Rimuovi dai preferiti</md-tooltip>
            </md-button>
          </div>

          </md-list-item>
          <md-divider class="md-inset"></md-divider>
        </md-list>
      </md-card-content>
    </md-card>

    <!-- avviso per confermare che la canzone è stata inserita nei preferiti quando la var preferiti è true -->
    <md-snackbar :md-duration="2000" :md-active.sync="preferiti" md-persistent>
      <span>Aggiunto ai preferiti!</span>
      <md-button class="md-primary" :to=" '/preferiti/' ">Vedi i preferiti</md-button>
    </md-snackbar>
    <!-- avviso per confermare che la canzone è stata rimossa dai preferiti quando la var rimosso è true -->
    <md-snackbar :md-duration="2000" :md-active.sync="rimosso" md-persistent>
      <span>Rimosso dai preferiti</span>
    </md-snackbar>
    <!-- dialog che invita a fare login per mettere la canzone nei preferiti -->
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
      playlist: [],
      islog: false,
      preferiti: false,
      loggati: false,
      rimosso: false
    };
  },
  created() {
    this.playlistArtista();
    this.isLogin();

  },
  methods: {
    //chiamata all'api per avere la playlist usando il parametro della route e scrive la risposta nella var playlist
    playlistArtista() {
      axios
        .get(
          "https://api.happi.dev/v1/music/artists/" +
            this.$route.params.id_artist +
            "/smart-playlist?apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH"
        )
        .then(data => {
          console.log("abbiamo trovato la playlist");
          this.playlist = data.data.result;
          //fa partire il metodo addCuorenero, e il vediPreferiti per ogni traccia
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

    //imposta il parametro cuorenero in ogni traccia come false
    addCuorenero() {
      this.playlist.forEach(traccia => {
        this.$set(traccia, "cuorenero", false);
      });
    },

    // funzione che controlla se lo username è impostato
    isLogin() {
      this.islog = !!localStorage.getItem("username");
    },

    // apre il dialog se non sei loggato, altrimenti richiama il metodo addPreferiti e apre la snackbar tramite this.preferiti = true
    controlloPreferiti(traccia, i) {
      if (this.islog == true) {
        this.preferiti = true;
        this.loggati = false;
        this.addPreferiti(traccia);
      } else {
        this.loggati = true;
        this.preferiti = false;
      }
    },

    // aggiunge la canzone ai preferiti inserendo i parametri richiesti dalla funzione del dataService e setta la var cuorenero true
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
          console.log("la canzone è stata aggiunta ai preferiti");
          this.$set(traccia, "cuorenero", true);
        })
        .catch(e => {
          console.error("Qualcosa è andato storto in addPreferiti! ");
          console.log(e);
        });
    },

    // rimuove la canzone dai preferiti, richiamando la funzione removePreferiti dal dataservice e imposta cuorenero false
    rimuoviPreferiti(traccia, i) {
      dataService.removePreferiti(traccia.id_track).then(() => {
        this.$set(this.playlist[i], "cuorenero", false);
        this.rimosso = true;
      });
    },

    // guarda se la traccia è nei preferiti associati all'username e se è così imposta cuorenero = true
    vediPreferiti(traccia, i) {
      dataService.getPreferiti(localStorage.getItem("username")).then(data => {
        data.forEach(doc => {
          console.log(doc.data());
          if (doc.data().id_track == traccia.id_track) {
            this.$set(this.playlist[i], "cuorenero", true);
          }
        });
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