<template>
  <md-app id="App" md-mode="fixed">
    <md-app-toolbar class="md-primary" md-persistent="full">
      <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button :to=" '/home/' ">
          <span class="md-title">30lyrix</span>
        </md-button>
      </div>
      <div class="md-toolbar-section-end">
        <md-dialog-alert
          :md-active.sync="loggati"
          md-title="Area riservata"
          md-content="Per visualizzare i preferiti devi prima effettuare il login."
          md-confirm-text="ok"
        />
        <span v-if="islog">Username: <b>{{username}}</b></span>
        <md-dialog-prompt
          :md-active.sync="dialogo"
          v-model="login"
          md-title="Inserisci il tuo nome"
          md-input-maxlength="30"
          md-input-placeholder="Scrivi il tuo nome..."
          md-confirm-text="Fatto"
          @md-confirm="setLogin()"
        />

        <md-button @click="dialogo=true" v-if="islog == false" class="md-icon-button">
          <md-icon>login</md-icon>
          <md-tooltip md-delay="200" md-direction="bottom">Login</md-tooltip>
        </md-button>
        <md-button @click="logout()" v-if="islog == true" class="md-icon-button">
          <md-icon>exit_to_app</md-icon>
          <md-tooltip md-delay="200" md-direction="bottom">Logout</md-tooltip>
        </md-button>
                <md-button class="md-icon-button" @click="isLogin(), aprireDialogo()">
          <md-icon>favorite</md-icon>
          <md-tooltip md-delay="200" md-direction="bottom">Preferiti</md-tooltip>
        </md-button>

      </div>
      </div>
    </md-app-toolbar>
    <md-app-content>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      prova: "ciao",
      dialogo: false,
      login: '',
      username: localStorage.getItem("username"),
      islog: undefined,
      loggati: undefined,
    };
  },
  // watch: {
  //   login: function(value) {
  //     this.islog == true;
  //   }
  // },
  created() {
    this.isLogin();
  },
  methods: {
    setLogin() {
      console.log(this.login);
      localStorage.setItem("username", this.login);
      this.islog = true;
      console.log(this.islog);
      this.$router.go();
      // this.$forceUpdate();
    },
    // getLogin (){
    //   return localStorage.getItem("username");
    // },
    isLogin() {
      this.islog = !!localStorage.getItem("username");
    },
    logout() {
      localStorage.removeItem("username");
      this.islog = false;
      this.login = undefined;
      if(this.$route.path == '/preferiti'){
      this.$router.push({ path: "/home" });
      console.log("sono in preferiti")
      }
      else{this.$router.go()}
    },
    aprireDialogo() {
    // return islog= !!localStorage.getItem("username");
    if (this.islog == false) {
      this.loggati = true;
    //   return this.addPreferiti();
    }
    else {
      this.$router.push({ path: "/preferiti" });
    //   this.loggati = true;
    //   this.preferiti = false;
    }
  }
  }
};
</script>