<template id="cardCanzone">
    <div class="md-size-33 md-layout-item md-small-size-50 md-xsmall-size-100">
        <md-card>
            <md-card-header>
            <md-card-header-text>
            <div class="md-title">{{canzone.track | truncate(20)}}</div>
            <div class="md-subhead">
                <router-link :to=" '/artista/' + canzone.id-artist">{{canzone.artist}}</router-link>
            </div>
            </md-card-header-text>

            <md-card-media>
                <img :src= canzone.cover>
            </md-card-media>
        </md-card-header>

        <md-card-actions>
            <md-button :to=" '/canzone/' + canzone.id_artist + '/' + canzone.id_album + '/' + canzone.id_track "
            class= "md-raised md-primary">Dettagli canzone</md-button>
        </md-card-actions>
        </md-card>
    </div>
</template>

<script>
export default {
    props: ["canzone"],
    filters: {
        truncate: function(source, value) {
            return source.length > value ? source.slice(0, value - 1) + "…" : source;
        }
    }

}   
</script>

<style>
    .md-card {
        margin: 5%;
    }
</style>