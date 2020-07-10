<template>
    <md-card class="md-layout-item">
      <md-card-header>
        <md-card-header-text>
          <span class="md-title">{{dettagli.track}}</span>
        </md-card-header-text>
        <md-card-action>
        <md-button class="md-icon-button">
            <md-icon>favorite_border</md-icon>
          </md-button>
            <md-tooltip md-delay="200" md-direction="left">Aggiungi ai preferiti</md-tooltip>
        </md-card-action>
      </md-card-header>
      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-cell >
              <b>Artista</b>
            </md-table-cell>
            <md-table-cell><router-link :to ="'/artista/' + this.$route.params.id_artist">
                {{dettagli.artist}}
           </router-link></md-table-cell>
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
            <md-table-cell><pre>{{testo}}</pre></md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
</template>

<script>
import axios from 'axios'
import cardCanzone from "../components/cardCanzone";

export default{
    data: function (){
        return{
        dettagli: null,
        testo: null,
        }
    },
    created (){
       this.dettagliCanzone();
       // this.testoCanzone();
    },
    methods: {
        dettagliCanzone() {
            axios.get('https://api.happi.dev/v1/music/artists/' + this.$route.params.id_artist 
            + '/albums/' + this.$route.params.id_album 
            + '/tracks/' + this.$route.params.id_track 
            +'?apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH')
            .then((data) => {
                console.log ('abbiamo trovato questo risultato');
                console.log (data);
                this.dettagli = data.data.result;

                if(this.dettagli.haslyrics == true){
                  this.testoCanzone();
                }
            }).catch((e) =>{
                console.error('qualcosa è andato storto');
                console.log(e);
            });
        },
        testoCanzone(){
            axios.get('https://api.happi.dev/v1/music/artists/' + this.$route.params.id_artist 
            + '/albums/' + this.$route.params.id_album 
            + '/tracks/' + this.$route.params.id_track 
            + '/lyrics?apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH')
                .then((data) => {
                console.log ('abbiamo trovato questo testo');
                console.log (data);

                this.testo = data.data.result.lyrics;  

            }) 
            .catch((e) =>{
                console.error('qualcosa è andato storto canzone');
                console.log(e);
            })
        }
    },
    filters: {
        capoTesto (text, value) {
            return text == value ? "<br>" : value; 
        }
    }, 
}
</script>

<style scoped>
    pre {
        font-family: "Roboto";
        font-weight: 400;
    }
</style>