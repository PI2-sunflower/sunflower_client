<template>
  <div class="cam-container">
    <img
      :src="defaultImg"
      class="cam-logo"
      v-if="image == null"
    />

    <img
      id="sat-track-image"
      :src="imgWithErrorUrl()"
      class="cam-logo-plot"
      v-if="image != null"
    />
  </div>
</template>


<script>
import { mapState } from "vuex";

const defImg = require("../assets/logo.png");

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
      keepFetching: false,
      image: null
    };
  },

  watch: {
    NORD(newNORD) {
      if (newNORD.length > 0) {
        this.keepFetching = true;
        this.fetchImage();
      } else {
        this.image = null;
        this.keepFetching = false;
      }
    }
  },

  computed: {
    ...mapState(["positions", "armData"]),

    defaultImg() {
      return defImg;
    }
  },

  destroyed() {
    this.keepFetching = false;
  },

  methods: {
    async fetchImage() {
      try {
        const URL = this.imgWithErrorUrl();

        let { data } = await axios.get(URL, {
          timeout: 15000
        });

        window.setTimeout(() => {
          this.image = data;
        }, 500);

        window.setTimeout(() => {
          if (this.NORD.length > 0 && this.keepFetching) {
            console.log("AGAIN !");
            // this.image = null;
            this.fetchImage();
          }
        }, 4000);
      } catch (e) {
        console.log(e);
        this.image = null;
        console.log("Could not update image");
      }
    },

    imgWithErrorUrl() {
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
        `/count=100` +
        `/step=10`;

      return BASE_URL + url;
    },

    withTwoDigits(value) {
      return ("0" + value.toString()).slice(-2);
    },

    getDate() {
      const date = new Date(new Date().toUTCString());

      return {
        year: date.getUTCFullYear(),
        month: this.withTwoDigits(date.getUTCMonth() + 1),
        day: this.withTwoDigits(date.getUTCDate()),
        hours: this.withTwoDigits(date.getUTCHours()),
        minutes: this.withTwoDigits(date.getUTCMinutes()),
        seconds: this.withTwoDigits(date.getUTCSeconds())
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
