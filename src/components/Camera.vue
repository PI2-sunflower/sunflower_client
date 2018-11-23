<template>
  <div class="cam-container">
    <img src="../assets/logo.png" class="cam-logo" v-if="NORD.length === 0" />
    <img :src="'http://localhost:8000/plotter/plot_azimuth_elevation/' + NORD + '/-15.989620/-48.044411/500/28/17/05/2018/1000/30'" class="cam-logo-plot" v-if="NORD.length > 0" />
  </div>
</template>


<script>
export default {
  name: "Camera",

  props: {
    NORD: {
      type: String,
      default: ""
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
