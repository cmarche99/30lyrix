<template>
  <div id="App">
    <md-app md-mode="fixed">
      <!-- toolbar a riga singola fissa -->
      <md-app-toolbar class="md-primary" md-persistent="full">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <!-- button a sinistra che riporta alla home da qualsiasi pagina -->
            <md-button :to=" '/home/' ">
              <span class="md-title">30LYRIX</span>
            </md-button>
          </div>

          <div class="md-toolbar-section-end">
            <!-- stampa l'username, solo se si è già fatto l'accesso -->
            <span v-if="islog">
              Username:
              <b>{{username}}</b>
            </span>

            <!-- button per fare login e logout che si mostrano in base alla variabile booleana islog -->
            <md-button @click="dialogo=true" v-if="islog == false" class="md-icon-button">
              <md-icon>login</md-icon>
              <md-tooltip md-delay="200" md-direction="bottom">Login</md-tooltip>
            </md-button>
            <md-button @click="logout()" v-if="islog == true" class="md-icon-button">
              <md-icon>exit_to_app</md-icon>
              <md-tooltip md-delay="200" md-direction="bottom">Logout</md-tooltip>
            </md-button>

            <!-- dialog che esce per fare il login -->
            <md-dialog-prompt
              :md-active.sync="dialogo"
              v-model="login"
              md-title="Inserisci il tuo nome"
              md-input-maxlength="30"
              md-input-placeholder="Scrivi il tuo nome..."
              md-confirm-text="Fatto"
              @md-confirm="setLogin()"
            />

            <!-- button per accedere alla pagina preferiti, attraverso i metodi isLogin e aprirePreferiti (controllando se si è effettuato il login) -->
            <md-button class="md-icon-button" @click="isLogin(), aprirePreferiti()">
              <md-icon>favorite</md-icon>
              <md-tooltip md-delay="200" md-direction="bottom">Preferiti</md-tooltip>
            </md-button>

            <!-- dialog che invita a fare il login per accedere ai preferiti -->
            <md-dialog-alert
              :md-active.sync="loggati"
              md-title="Area riservata"
              md-content="Per visualizzare i preferiti devi prima effettuare il login."
              md-confirm-text="ok"
            />
          </div>
        </div>
      </md-app-toolbar>

      <!-- contenuto dell'app gestito dal router-view -->
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      dialogo: false, // se è true si apre il dialogo di login
      login: "", // variabile che viene impostata con l'inserimento del nome nel dialog
      username: localStorage.getItem("username"), // corrisponde all'username che c'è nel localStorage
      islog: undefined, // boolean che è true se è stato fatto un login, altrimenti è false
      loggati: false // se è true si apre il dialogo che invita a fare il login
    };
  },
  created() {
    this.isLogin();
  },
  methods: {
    // dopo aver fatto il login si ricarica la pagina, si assegna ad username il valore della variabile login, imposta a true la variabile islog
    setLogin() {
      this.$router.go();
      localStorage.setItem("username", this.login);
      this.islog = true;
    },

    // funzione che controlla se lo username è impostato
    isLogin() {
      this.islog = !!localStorage.getItem("username");
    },

    // rimuove l' username dal localStorage, imposta false il valore di islog e svuota la variabile login
    logout() {
      //se viene effettutato il logout nella pagina preferiti, vieni indirizzato alla Home, altrimenti ricarica la pagina corrente
      if (this.$route.path == "/preferiti") {
        this.$router.push({ path: "/home" });
      } else {
        this.$router.go();
      }
      localStorage.removeItem("username");
      this.islog = false;
      this.login = "";
    },

    // se non sei loggato apre il dialog per invitarti a farlo, altrimenti indirizza alla pagina preferiti
    aprirePreferiti() {
      if (this.islog == false) {
        this.loggati = true;
      } else {
        this.$router.push({ path: "/preferiti" });
      }
    }
  }
};
</script>