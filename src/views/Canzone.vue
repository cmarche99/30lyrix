<template>
  <div>
    <md-card class="md-layout-item">
      <md-card-header>
        <md-card-header-text>
          <span class="md-title">{{dettagli.track}}</span>
        </md-card-header-text>
        <md-card-actions>
          <md-button class="md-icon-button" @click="isLogin(); aprireDialogo();">
            <md-icon>favorite_border</md-icon>
          </md-button>
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

          <md-tooltip md-delay="200" md-direction="left">Aggiungi ai preferiti</md-tooltip>
        </md-card-actions>
      </md-card-header>

      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-cell>
              <b>Artista</b>
            </md-table-cell>
            <md-table-cell>
              <router-link :to="'/artista/' + this.$route.params.id_artist">{{dettagli.artist}}</router-link>
            </md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-cell>
              <b>Album</b>
            </md-table-cell>
            <md-table-cell>{{dettagli.album}}</md-table-cell>
          </md-table-row>
          <md-table-row v-if="dettagli.haslyrics">
            <md-table-cell>
              <b>Testo</b>
            </md-table-cell>
            <md-table-cell>
              <pre>{{testo}}</pre>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import axios from "axios";
import dialogoLogin from "../components/dialogoLogin";
import dataService from "../dataService";

export default {
  data: function() {
    return {
      dettagli: '',
      testo: null,
      islog: undefined,
      preferiti: undefined,
      loggati: undefined
    };
  },
  created() {
    this.dettagliCanzone();
  },
  methods: {
    dettagliCanzone() {
      axios
        .get(
          "https://api.happi.dev/v1/music/artists/" +
            this.$route.params.id_artist +
            "/albums/" +
            this.$route.params.id_album +
            "/tracks/" +
            this.$route.params.id_track +
            "?apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH"
        )
        .then(data => {
          console.log("abbiamo trovato questo risultato");
          console.log(data);
          this.dettagli = data.data.result;

          if (this.dettagli.haslyrics == true) {
            this.testoCanzone();
          }
        })
        .catch(e => {
          console.error("qualcosa è andato storto");
          console.log(e);
        });
    },
    testoCanzone() {
      axios
        .get(
          "https://api.happi.dev/v1/music/artists/" +
            this.$route.params.id_artist +
            "/albums/" +
            this.$route.params.id_album +
            "/tracks/" +
            this.$route.params.id_track +
            "/lyrics?apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH"
        )
        .then(data => {
          console.log("abbiamo trovato questo testo");
          console.log(data);

          this.testo = data.data.result.lyrics;
        })
        .catch(e => {
          console.error("qualcosa è andato storto canzone");
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
    addPreferiti (){
      dataService.setPreferiti(
        this.dettagli.id_track,
        this.$route.params.id_artist,
        this.$route.params.id_album)
      .then(preferiti => {
          console.log ('successo');
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
pre {
  font-family: "Roboto";
  font-weight: 400;
}
</style>