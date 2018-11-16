<template>
  <div class="row">
    <div class="col col-6">
      <div class="row">
        <div class="col col-12">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a :class="'controlTab nav-link ' + (controlTab == 'b' ? 'active' : '')" @click="setTab('b')">Braço</a>
            </li>

            <li class="nav-item">
              <a :class="'controlTab nav-link ' + (controlTab == 'a' ? 'active' : '')" @click="setTab('a')">Antena</a>
            </li>
          </ul>

          <br />

          <UpDownMovement v-if="controlTab == 'b'" />
          <AngleControl v-if="controlTab == 'a'" />
        </div><!-- /col-12 -->
      </div><!-- /row -->
    </div>

    <div class="col col-6">
      <Camera />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Camera from "../components/Camera";
import UpDownMovement from "../components/UpDownMovement";
import AngleControl from "../components/AngleControl";

export default {
  name: "Control",

  components: {
    Camera,
    UpDownMovement,
    AngleControl
  },

  data() {
    return {
      controlTab: "b",
      axis: "B"
    };
  },

  computed: {
    ...mapState(["control"])
  },

  methods: {
    setTab(tab) {
      this.controlTab = tab;
    }
  }
};
</script>

<style scoped>
.controlTab {
  cursor: pointer;
}

.controlTab.active {
  color: rgb(0, 123, 255) !important;
}
</style>
