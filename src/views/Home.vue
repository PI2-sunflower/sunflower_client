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
      let map = L.map("map-tracker");
      let satIcon = L.icon({
        iconUrl: "/images/sate-1.png",
        iconSize: [60, 60]
      });

      let lat = -15.77972;
      let long = -47.92972;

      map.setView([lat, long], 3);

      let marker = L.marker([lat, long], { icon: satIcon });
      marker.addTo(map);

      const URI =
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

      L.tileLayer(URI, {
        maxZoom: 18,
        attribution: `
                  Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
                  contributors, 
                    <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
                  Imagery © <a href="https://www.mapbox.com/">Mapbox</a>
                `,
        id: "mapbox.streets"
      }).addTo(map);
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
