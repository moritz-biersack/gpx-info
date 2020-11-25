<template lang="pug">
    div(class=' p-4 bg-lavender container max-w-lg mx-4 rounded text-white')
        //- Upload Box
        div(v-if="!gpx").bg-gray-100.p-1.m-14.rounded.text-gray-700
            div.border-dashed.border-2.border-gray-400.rounded.p-4.flex.justify-center
                label(for="fileInput" class="cursor-pointer hover:text-blue-400 text-center") 
                    div(v-html="uploadIcon" class="w-16 h-16")
                    span Upload
                    //- Hidden input
                    input(@change="onFileChange" class='w-0 h-0' type='file' name='file' id="fileInput" accept=".gpx")
        div(v-show="gpx")
            div.flex.justify-center
                h2.text-xl.text-center Your Tour
                button(@click="redo").ml-2
                    div(v-html="refreshIcon" class=" w-6 h-6 hover:text-blue-400")
            Gpx(v-bind:gpx="gpx").p-10
            div.flex.justify-between
                div Name:
                div {{ trackName }}
            div.flex.justify-between
                div Distance:
                div {{ distance }} km
            div.flex.justify-between
                div Elevation:
                div {{ elevation }} m
</template>

<script>

import Vue from "vue"
import Gpx from "./Gpx.vue"
import gpxparser from "gpxparser"

const uploadIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>`

const refreshIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
`

module.exports = {
  data: function() {
    return {
      uploadIcon,
      refreshIcon,
      trackName: '',
      distance: 0,
      elevation: 0,
      gpx: '',
    };
  },
  components: {
    Gpx
  },
  methods: {
    redo: function() {
        this.gpx = '';
    },
    onFileChange: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      var reader = new FileReader();

      reader.onload = (e) => {
        let gpx = new gpxparser();
        gpx.parse(e.target.result);
        this.distance = (gpx.tracks[0].distance.total / 1000).toFixed(1);
        this.trackName = gpx.metadata.name;
        this.elevation = (gpx.tracks[0].elevation.pos).toFixed(1);
        this.gpx = e.target.result;
      };
      reader.readAsText(files[0]);
    },
  }
}

</script>
