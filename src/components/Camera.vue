<template>
  <div class="cam-container">
    <img src="../assets/logo.png" class="cam-logo" v-if="NORD.length === 0" />

    <img :src="imgUrl" class="cam-logo-plot" v-if="NORD.length > 0" />
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "Camera",

  props: {
    NORD: {
      type: String,
      default: ""
    }
  },

  computed: {
    ...mapState(["positions"]),

    imgUrl() {
      const { latitude, longitude, altitude } = this.positions;
      const date = new Date();

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
        "1000/2";

      return BASE_URL + PLOTTER;
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
