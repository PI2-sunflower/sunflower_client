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
    ...mapState(["positions", "armData"]),

    imgWithError() {
      const BASE_URL = "http://localhost:8000/plotter/plot_az_el_offsets";
      const { latitude, longitude, altitude } = this.positions;
      const { error_angle_1, error_angle_2, magnetometer } = this.armData;
      const { year, month, day, hours, minutes, seconds } = this.getDate();

      let url =
        `/norad=${this.NORD}` +
        `/lat=${latitude}` +
        `/lon=${longitude}` +
        `/alt=${altitude}` +
        `/north_offset=${magnetometer}` +
        `/az_offset=${error_angle_1}` +
        `/el_offset=${error_angle_2}` +
        `/year=${year}` +
        `/month=${month}` +
        `/day=${day}` +
        `/hour=${hours}` +
        `/minute=${minutes}` +
        `/second=${seconds}` +
        `/count=500` +
        `/step=5`;

      return BASE_URL + url;
    },

    imgUrl() {
      const { latitude, longitude, altitude } = this.positions;
      const { year, month, day, hours, minutes, seconds } = this.getDate();

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
        year +
        "/" +
        month +
        "/" +
        day +
        "/" +
        hours +
        "/" +
        minutes +
        "/" +
        seconds +
        "/" +
        "500/5";

      return BASE_URL + PLOTTER;
    }
  },

  methods: {
    async fetchImage() {
      try {
        let { data } = await axios.get(this.imgWithError, {
          timeout: 8000
        });

        this.image = data;
      } catch (e) {
        console.log(e);
        this.image = null;
      }
    },

    withTwoDigits(value) {
      return ("0" + value.toString()).slice(-2);
    },

    getDate() {
      const date = new Date(new Date().toUTCString());

      return {
        year: date.getFullYear(),
        month: this.withTwoDigits(date.getMonth() + 1),
        day: this.withTwoDigits(date.getDate()),
        hours: this.withTwoDigits(date.getHours()),
        minutes: this.withTwoDigits(date.getMinutes()),
        seconds: this.withTwoDigits(date.getSeconds())
      };
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
