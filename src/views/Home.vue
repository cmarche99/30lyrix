<template>
    <div>
            <md-field md-dense :md-counter="false">
                <label for="ricerca">Cerca la canzone</label>
                <md-input type= text v-model="ricerca" name="ricerca" id="ricerca" maxlength="800"></md-input>
            </md-field>
            <md-button @click= cercaCanzone() type="submit" class="md-primary" display="inline">
                Cerca
            </md-button>
            <br><br>
            <div class="md-layout md-gutter md-alignment-center">
            <cardCanzone v-for="traccia in risultati" :key="traccia.id_track" :canzone="traccia">
            </cardCanzone>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import cardCanzone from "../components/cardCanzone";

export default {
    components: {
        cardCanzone,
    },
    data: function (){
        return{
            ricerca: null,
            risultati: null,
        }
    },
    methods: {
        cercaCanzone(){
      axios.get('https://api.happi.dev/v1/music?q=' + this.ricerca +'&limit=30&apikey=945335Zmq8pmd4LEAhl2oM3HYyGxq5cWA0rYkQPdkYe7qo38CukWVmcH&type=')
      .then((data) => {
        // console.log ('successo');
        // console.log(data);
        this.risultati = data.data.result;
      }).catch((e) =>{
        console.error('Qualcosa è andato storto! ');
        console.log(e);
      });
    }
    }

}
</script>