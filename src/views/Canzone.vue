<template>
  <div>
    <md-card class="md-layout-item">
      <md-card-header>
        <md-card-header-text>
          <span class="md-title">{{dettagli.track}}</span>
        </md-card-header-text>

        <!-- button che si vede se la canzone non è nei preferiti e permette di aggiungerla -->
        <md-card-actions v-if="cuorenero == false">
          <md-button class="md-icon-button" @click="isLogin(); controlloPreferiti()">
            <md-icon>favorite_border</md-icon>
          </md-button>
          <md-tooltip md-delay="200" md-direction="left">Aggiungi ai preferiti</md-tooltip>
        </md-card-actions>

        <!-- button che si vede se la canzone è nei preferiti e permette di rimuoverla -->
        <md-card-actions v-if="cuorenero == true">
          <md-button class="md-icon-button" @click="rimuoviPreferiti()">
            <md-icon>favorite</md-icon>
          </md-button>
          <md-tooltip md-delay="200" md-direction="left">Rimuovi dai preferiti</md-tooltip>
        </md-card-actions>

        <!-- avviso per l'aggiunta della canzone ai preferiti e collegamento alla pagina Preferiti -->
        <md-snackbar :md-duration="3000" :md-active.sync="preferiti" md-persistent>
          <span>Aggiunto ai preferiti!</span>
          <md-button class="md-primary" :to=" '/preferiti/' ">Vedi i preferiti</md-button>
        </md-snackbar>

        <!-- avviso per la rimozione della canzone dai preferiti e possibilità di annullamento dell'azione -->
        <md-snackbar :md-duration="3000" :md-active.sync="rimosso" md-persistent>
          <span>Rimosso dai preferiti</span>
          <md-button class="md-primary" @click="addPreferiti()">Annulla</md-button>
        </md-snackbar>

        <!-- dialog per invitarti a fare il login prima di aggiungere la canzone ai preferiti -->
        <md-dialog-alert
          :md-active.sync="loggati"
          md-title="Ops, sembra che tu non abbia effettuato l'accesso"
          md-content="Per aggiungere una canzone ai preferiti devi prima effettuare il login"
          md-confirm-text="ok"
        />

        <md-card-media class="md-medium">
          <img :src="album.cover" />
        </md-card-media>
      </md-card-header>

      <md-card-content>
        <!-- tabella con le informazioni della canzone ricavate dalla chiamata API -->
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
              <!-- tag pre per visualizzare il testo formattato con i caratteri speciali -->
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
import dataService from "../dataService";

export default {
  data: function() {
    return {
      dettagli: [], //variabile impostata dalla chiamata api con le info sulla canzone 
      testo: '', //variabile impostata dalla chiamata api con il testo
      album: [], //variabile impostata dalla chiamata api per avere info sull'album
      islog: false, //è true se c'è il login fatto
      loggati: false, //se è true apre il dialog che invita a fare il login
      preferiti: false, //se è true apre la snackbar di conferma aggiunta ai preferiti
      cuorenero: undefined, //se è true mostra il cuore pieno, altrimenti quello vuoto
      rimosso: false //se è true mostra la snackbar di conferma rimozione
    };
  },
  
  created() {
    this.dettagliCanzone();
    this.albumCanzone();
  },
  methods: {
    
    // esegue la chiamata con i parametri della route, scrive i risultati nella var dettagli
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
          console.log("abbiamo trovato questo risultato di dettagli");
          this.dettagli = data.data.result;
          this.vediPreferiti();
          // controlla se la canzone ha il testo, e se è true esegue testoCanzone()
          if (this.dettagli.haslyrics == true) {
            this.testoCanzone();
          }
        })
        .catch(e => {
          console.error("qualcosa è andato storto nei dettagli");
          console.log(e);
        });
    },

    // esegue la chiamata con i parametri della route, scrive il lyrics nella var testo
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
          this.testo = data.data.result.lyrics;
        })
        .catch(e => {
          console.error("qualcosa è andato storto nel testo");
          console.log(e);
        });
    },
    
    // esegue la chiamata con i parametri della route, scrive le info sull'album nella var album
    albumCanzone() {
      axios
        .get(
          "https://api.happi.dev/v1/music/artists/" +
            this.$route.params.id_artist +
            "/albums/" +
            this.$route.params.id_album +
            "?apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH"
        )
        .then(data => {
          console.log("abbiamo trovato questo album");
          this.album = data.data.result;
        })
        .catch(e => {
          console.error("qualcosa è andato storto nell'album");
          console.log(e);
        });
    },

    // funzione che controlla se lo username è impostato
    isLogin() {
      this.islog = !!localStorage.getItem("username");
    },

    // apre il dialog se non sei loggato, altrimenti richiama il metodo addPreferiti e apre la snackbar tramite this.preferiti = true
    controlloPreferiti() {
      if (this.islog == true) {
        this.preferiti = true;
        this.loggati = false;
        return this.addPreferiti();
      } else {
        this.loggati = true;
        this.preferiti = false;
      }
    },

    // aggiunge la canzone ai preferiti inserendo i parametri richiesti dalla funzione del dataService e imposta la var cuorenero = true
    addPreferiti() {
      this.cuorenero = true;
      dataService
        .setPreferiti(
          this.dettagli.id_track,
          this.dettagli.track,
          this.$route.params.id_artist,
          this.dettagli.artist,
          this.$route.params.id_album,
          this.album.cover
        )
        .then(preferiti => {
          console.log("la canzone è stata aggiunta ai preferiti");
        })
        .catch(e => {
          console.error("Qualcosa è andato storto nell'aggiungere la canzone ai preferiti");
          console.log(e);
        });
    },

    // guarda se questa canzone è nei preferiti associati all'username e se è così imposta cuorenero true  
    vediPreferiti() {
      dataService.getPreferiti(localStorage.getItem("username")).then(data => {
        data.forEach(doc => {
          if (doc.data().id_track == this.dettagli.id_track) {
            this.cuorenero = true;
          }
        });
      });
    },
    
    // rimuove la canzone dai preferiti, richiamando la funzione removePreferiti dal dataservice e imposta cuorenero false
    rimuoviPreferiti() {
      dataService.removePreferiti(this.dettagli.id_track).then(() => {
        this.cuorenero = false;
        this.rimosso = true;
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