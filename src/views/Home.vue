<template>
  <div id="main-container" class="container">
    <div id="controls" class="row">
      Top
    </div>

    <div id="views" class="row">
      <div id="cam-container" class="col col-6">Left</div>
      <div id="map-container" class="col col-6">
        <div id="map-tracker"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMap, getMarker } from "../services/track-map";

export default {
  name: "home",

  components: {},

  data() {
    return {};
  },

  mounted() {
    this.initMap();
  },

  methods: {
    initMap() {
      let lat = -15.77972;
      let long = -47.92972;

      const map = getMap("map-tracker", lat, long);
      const marker = getMarker(map, lat, long);
    }
  }
};
</script>

<style>
#main-container {
  background-color: gray;
  border: solid 2px #000;
  height: 99vh;
}

#controls {
  background-color: green;
  height: 40%;
}

#views {
  height: 60%;
}

#cam-container {
  background-color: gray;
}
#map-container {
  background-color: blue;
}
#map-tracker {
  background-color: yellow;
  width: 100%;
  height: 100%;
}
</style>
