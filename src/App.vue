<template>
  <md-app id="App" md-mode="fixed-last">
    <md-app-toolbar class="md-primary">
      <div class="md-toolbar-section start">
        <md-button :to=" '/home/' ">
          <span class="md-title">30lyrix</span>
        </md-button>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button" @click="isLogin(), aprireDialogo()">
          <md-icon>favorite</md-icon>
          <md-tooltip md-delay="200" md-direction="left">Vedi preferiti</md-tooltip>
        </md-button>
        <md-dialog-alert
          :md-active.sync="loggati"
          md-title="Azione non permessa"
          md-content="Per visualizzare i preferiti devi prima essere loggato"
          md-confirm-text="ok"
        />
        <!-- </div>
        <div>-->
        <span v-if="login">Login: {{login}}</span>
        <md-dialog-prompt
          :md-active.sync="dialogo"
          v-model="login"
          md-title="Inserisci il tuo nome"
          md-input-maxlength="30"
          md-input-placeholder="Scrivi il tuo nome..."
          md-confirm-text="Fatto"
          @md-confirm="setLogin()"
        />

        <md-button @click="dialogo=true" v-if="islog == false">login</md-button>
        <!-- <p>{{islog}}</p> -->
        <md-button @click="logout()" v-if="islog == true">logout</md-button>
        <!-- <div>
        <p v-if="islog">Benvenuto {{username}}</p>
        <p>{{islog}}</p>
        </div>-->
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
      login: undefined,
      // username: this.getLogin(),
      islog: undefined,
      loggati: undefined,
    };
  },
  watch: {
    login: function(value) {
      this.islog == true;
    }
  },
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
      if(this.$route.path === '/preferiti'){
      this.$router.push({ path: "/home" });
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