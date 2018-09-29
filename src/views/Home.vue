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
import axios from "../services/axios-setup";

const MapData = {
  map: null,
  marker: null,
  from: null,
  to: null,
  positions: []
};

window.MapData = MapData;

export default {
  name: "home",

  components: {},

  data() {
    return {};
  },

  mounted() {
    this.initMap();
    this.getPositions();
  },

  methods: {
    initMap() {
      let lat = -15.77972;
      let long = -47.92972;

      const map = getMap("map-tracker", lat, long);
      MapData.map = map;
    },

    async getPositions() {
      let { data, status } = await axios.get("/track-data");

      if (data.positions) {
        let { from, to } = data.positions_validation;

        MapData.from = new Date(from);
        MapData.to = new Date(to);
        MapData.positions = data.positions;

        this.setMarker();
      }
    },

    setMarker() {
      let curPosition = 0;
      let { satlatitude, satlongitude } = MapData.positions[0];

      if (MapData.marker === null) {
        const marker = getMarker(MapData.map, satlatitude, satlongitude);
        MapData.marker = marker;
      } else {
        MapData.marker.addTo(MapData.map);
      }

      MapData.map.setView([satlatitude, satlongitude], 3);

      let self = this;

      function tracker() {
        let position = MapData.positions[curPosition++];
        let { satlatitude, satlongitude } = position;

        MapData.marker.setLatLng([satlatitude, satlongitude]);

        MapData.from.setSeconds(MapData.from.getSeconds() + 1);

        if (MapData.from < MapData.to) {
          window.setTimeout(tracker, 1000);
        } else {
          MapData.marker.remove();
          self.getPositions();
        }
      }

      tracker();
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
