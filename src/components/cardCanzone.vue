<template id="cardCanzone">
  <div class="md-size-33 md-layout-item md-small-size-50 md-xsmall-size-100">
    <md-card>
      
      <md-card-media md-ratio="16:9">
        <img :src="canzone.cover" />
      </md-card-media>

      <md-card-header>
        <md-card-header-text>
          <div class="md-title">
            {{canzone.track | taglioTitolo(20)}}
            <md-tooltip md-delay="200" md-direction="bottom">{{canzone.track}}</md-tooltip>
          </div>
          <div class="md-subhead">
            <router-link :to=" '/artista/' + canzone.id_artist">{{canzone.artist}}</router-link>
          </div>
        </md-card-header-text>
      </md-card-header>

      <md-card-actions>
        <!-- button che porta alla pagina di dettaglio della canzone, con i parametri id_artist, id_album e id_track -->
        <md-button
          :to=" '/canzone/' + canzone.id_artist + '/' + canzone.id_album + '/' + canzone.id_track"
          class="md-primary"
        >Dettagli canzone</md-button>
      </md-card-actions>

    </md-card>
  </div>
</template>

<script>
export default {
  props: ["canzone"],
  filters: {
    //filtro per accorciare i titoli lunghi
    taglioTitolo: function(source, value) {
      return source.length > value ? source.slice(0, value - 1) + "…" : source;
    }
  }
};
</script>

<style>
.md-card {
  margin: 5%;
}
</style>