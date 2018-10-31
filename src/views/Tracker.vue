<template>
  <div class="col col-12">
    <div class="row">
      <div class="col col-6">
        <div id="tracker-form">
          <div class="form-group">
            <label for="satNORD">Código NORD</label>
            <input type="text" class="form-control" id="satNORD" aria-describedby="satNORD" placeholder="000000" v-model="NORD">
            <small id="satNORDHelp" class="form-text text-muted">
              Não sabe o código NORD ?
              <a href="https://www.n2yo.com/database/" target="BLANK">Clique aqui</a>
            </small>
          </div><!-- /form-group -->

          <button v-if="isTracking === false" class="btn btn-primary" @click="setTracking(true)">Rastrear</button>

          <button v-if="isTracking === true" :class="'btn btn-' + (current.satname ? 'danger' : 'warning')" @click="setTracking(false)">Parar rastreamento</button>

          <font-awesome-icon icon="spinner" class="it-is-spinning spin-big" v-if="isTracking && !current.satname" />
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

    <div class="row">
      <div class="col col-6">
        <Camera />
      </div><!-- /col-6 -->

      <div id="map-container" class="col col-6">
        <div id="map-tracker"></div>
      </div><!-- /col-6 -->
    </div><!-- /row -->
  </div><!-- /col-12 -->
</template>

<script>
import { mapState } from "vuex";
import { getMap, getMarker } from "../services/track-map";
import axios from "../services/axios-setup";

import Camera from "../components/Camera";

const MapData = {
  map: null,
  marker: null
};

window.MapData = MapData;

export default {
  name: "Tracker",

  components: { Camera },

  data() {
    return {
      NORD: "25544",
      isTracking: false,
      current: {}
    };
  },

  computed: {
    ...mapState(["track"])
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
  },

  destroyed() {
    this.resetMapData();
    this.stopTrack();
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
    },

    async stopTrack() {
      await axios.get("/stop-track");
      this.current = {};
    },

    resetMapData() {
      MapData.map = null;
      MapData.marker = null;
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

        this.$store.dispatch("setTrackData", {
          from: new Date(from),
          to: new Date(to),
          positions: data.positions,
          info: data.info
        });

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
      let { satlatitude, satlongitude } = this.track.positions[0];

      if (MapData.marker === null) {
        const marker = getMarker(MapData.map, satlatitude, satlongitude);
        MapData.marker = marker;
      } else {
        MapData.marker.addTo(MapData.map);
      }

      MapData.map.setView([satlatitude, satlongitude], 3);

      let self = this;
      let curPosition = 0;

      function tracker() {
        let position = self.track.positions[curPosition++];
        let { satlatitude, satlongitude } = position;

        if (self.isTracking) {
          self.current = position;
          self.current.satname = self.track.info.satname;
          MapData.marker.setLatLng([satlatitude, satlongitude]);
        }

        if (curPosition < 60 && self.isTracking) {
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
.loading-spinner {
  width: 40px;
  margin-left: 10px;
}
.spin-big {
  font-size: 26px;
}

#map-container {
  height: 300px;
}

#map-tracker {
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
}
</style>
