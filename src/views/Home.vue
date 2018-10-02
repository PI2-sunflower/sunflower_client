<template>
  <div id="main-container" class="container">
    <div id="controls" class="row">
      <div class="col col-12">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <span class="nav-link disabled">Modo: </span>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">Rastreador</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Fixo</a>
          </li>
        </ul>

        <hr />

        <div class="row">
          <div class="col col-6">
            <div id="tracker-form">
              <div class="form-group">
                <label for="satNORD">Código NORD</label>
                <input
              type="text"
              class="form-control"
              id="satNORD"
              aria-describedby="satNORD"
              placeholder="000000" v-model="NORD">
                <small id="satNORDHelp" class="form-text text-muted">
                  Não sabe o código NORD ?
                  <a href="https://www.n2yo.com/database/" target="BLANK">Clique aqui</a>
                </small>
              </div><!-- /form-group -->

              <button v-if="isTracking === false" class="btn btn-primary" @click="setTracking(true)">Rastrear</button>
              <button v-if="isTracking === true" class="btn btn-danger" @click="setTracking(false)">Parar rastreamento</button>
            </div><!-- /#tracker-form -->
          </div><!-- /col-6 -->

          <div class="col col-6">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{{current.satname}}</td>
                </tr>
                <tr>
                  <td>Latidude:</td>
                  <td>{{current.satlatitude}}</td>
                </tr>
                <tr>
                  <td>Longitude:</td>
                  <td>{{current.satlongitude}}</td>
                </tr>
              </tbody>
            </table>
          </div><!-- /col-6 -->
        </div><!-- /row -->
      </div><!-- /col-12 -->
    </div><!-- /row -->

    <div id="views" class="row">
      <div id="cam-container" class="col col-6">
        Video da câmera
      </div><!-- /col-6 -->

      <div id="map-container" class="col col-6">
        <div id="map-tracker"></div>
      </div><!-- /col-6 -->
    </div><!-- /row -->
  </div><!-- /container -->
</template>

<script>
import { getMap, getMarker } from "../services/track-map";
import axios from "../services/axios-setup";

const MapData = {
  map: null,
  marker: null,
  from: null,
  to: null,
  positions: [],
  info: null
};

window.MapData = MapData;

export default {
  name: "home",

  components: {},

  data() {
    return {
      NORD: "25544",
      isTracking: false,
      current: {}
    };
  },

  watch: {
    NORD() {
      if (this.isTracking) {
        this.setTracking(false);
      }
    }
  },

  mounted() {
    this.initMap();
    // this.getPositions();
  },

  methods: {
    setTracking(value) {
      if (typeof value !== "boolean") throw new Error("Value must be boolean");
      this.isTracking = !!value;

      if (this.isTracking) {
        this.initTrack();
      } else {
        this.stopTrack();
      }
    },

    async initTrack() {
      const nord = this.NORD;
      await axios.get(`/track/${nord}`);
      this.getPositions();
      alert("Track started");
    },

    async stopTrack() {
      await axios.get("/stop-track");
      alert("Track stoped");
    },

    initMap() {
      let lat = -15.77972;
      let long = -47.92972;

      const map = getMap("map-tracker", lat, long);
      MapData.map = map;
    },

    async getPositions() {
      console.log("GET /track-data");
      let { data, status } = await axios.get("/track-data");
      console.log(`STATUS ${status}`);

      if (data.positions) {
        let { from, to } = data.positions_validation;

        MapData.from = new Date(from);
        MapData.to = new Date(to);
        MapData.positions = data.positions;
        MapData.info = data.info;

        console.log("GO marker");

        this.setMarker();
      } else {
        console.log("Não deu ?");
        if (this.isTracking) {
          window.setTimeout(() => this.getPositions(), 1000);
        }
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

        self.current = position;
        self.current.satname = MapData.info.satname;

        MapData.marker.setLatLng([satlatitude, satlongitude]);

        MapData.from.setSeconds(MapData.from.getSeconds() + 1);

        if (MapData.from < MapData.to && self.isTracking) {
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
  margin-top: 10px;
}

#controls {
}

#views {
  height: 300px;
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
