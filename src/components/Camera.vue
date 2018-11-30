<template>
  <div class="cam-container">
    <img
      src="../assets/logo.png"
      class="cam-logo"
      v-if="image === null"
    />

    <img
      :src="imgUrl"
      class="cam-logo-plot"
      v-if="image !== null"
    />
  </div>
</template>


<script>
import { mapState } from "vuex";

import axios from "../services/axios-setup";

export default {
  name: "Camera",

  props: {
    NORD: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      image: null
    };
  },

  watch: {
    NORD(newNORD) {
      if (newNORD.length > 0) {
        this.fetchImage();
      } else {
        this.image = null;
      }
    }
  },

  computed: {
    ...mapState(["positions"]),

    imgWithError() {
      // "http://0.0.0.0:8000/plotter/plot_az_el_offsets/norad=25544/lat=0/lon=0/alt=0/north_offset=0/az_offset=0/el_offset=0/year=2018/month=11/day=29/hour=14/minute=37/second=15/count=5/step=1"
      // const BASE_URL = "http://localhost:8000/plotter/plot_az_el_offsets";
    },

    imgUrl() {
      const { latitude, longitude, altitude } = this.positions;
      const date = new Date(new Date().toUTCString());

      const BASE_URL = "http://localhost:8000/plotter/plot_azimuth_elevation";

      const PLOTTER =
        "/" +
        this.NORD +
        "/" +
        latitude +
        "/" +
        longitude +
        "/" +
        altitude +
        "/" +
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        "/" +
        date.getHours() +
        "/" +
        date.getMinutes() +
        "/" +
        date.getSeconds() +
        "/" +
        "500/5";

      return BASE_URL + PLOTTER;
    }
  },

  methods: {
    async fetchImage() {
      try {
        let { data } = await axios.get(this.imgUrl, {
          timeout: 8000
        });

        this.image = data;
      } catch (e) {
        this.image = null;
      }
    }
  }
};
</script>

<style>
.cam-container {
  text-align: center;
  background-color: #f2f2f2;
  height: 300px;
}

.cam-container img.cam-logo {
  width: 321px;
  margin: 15% auto;
}

.cam-logo-plot {
  width: 524px;
}
</style>
