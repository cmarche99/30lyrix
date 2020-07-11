<template>
<div>
  <!-- <dialogoLogin :dialogo="dialogo"
  v-on:childToParent="onChildClick"
  v-on:alpadre="onschiaccio">
  </dialogoLogin> -->
  <md-card class="md-layout-item">
    <md-card-header>
      <md-card-header-text>
        <span class="md-title">{{dettagli.track}}</span>
      </md-card-header-text>
      <md-card-actions v-if="islog == true">
        <md-button class="md-icon-button">
          <md-icon>favorite_border</md-icon>
        </md-button>
        <!-- <span v-if="login">Login: {{login}}</span>
          <md-dialog-prompt 
            v-if="login != ''"
            :md-active.sync="dialogo"
            v-model="login"
            md-title="What's your name?"
            md-input-maxlength="30"
            md-input-placeholder="Type your name..."
            md-confirm-text="Done" 
            @md-confirm="setLogin()"/> -->
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

export default {
  data: function() {
    return {
      dettagli: null,
      testo: null,
      // dialogo: false,
      // login: undefined,
      // fromChild: '',
      islog: this.isLogin()
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
      return !!localStorage.getItem("username");
    },
    // setLogin(){
    //   console.log(this.login);
    //   localStorage.setItem("username", this.login)
    // }

    // onChildClick(value){
    //   this.fromChild = value;
    //   console.log(this.fromChild);
    // },
    // onschiaccio(value){
    //   this.dialogo = value;
    //   console.lof(this.dialogo);
    // }
  }
};
</script>

<style>
pre {
  font-family: "Roboto";
  font-weight: 400;
}
</style>