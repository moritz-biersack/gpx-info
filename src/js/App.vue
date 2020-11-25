<template lang="pug">
    Upload(v-if="!hasFile")
</template>

<script>

import Vue from "vue";
import Upload from "./Upload.vue"

module.exports = {
  data: function() {
    return {
      title: "Upload GPX File",
      hasFile: false,
    };
  },
  components: {
      Upload
  },
}

</script>
