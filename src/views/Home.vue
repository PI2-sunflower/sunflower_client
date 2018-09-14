<template>
  <div class="container">
    <h1>Modo atual</h1>

    <hr />

    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" @click="setMode('none')" :checked="currentMode == 'none'">
      <label class="form-check-label" for="exampleRadios1">
        Desabilitado
      </label>
    </div>

    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" @click="setMode('fixed')" :checked="currentMode == 'fixed'">
      <label class="form-check-label" for="exampleRadios2">
        Posição fixa
      </label>
    </div>

    <div class="form-check disabled form-check-inline">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" @click="setMode('track')" :checked="currentMode == 'track'">
      <label class="form-check-label" for="exampleRadios3">
        Rastreador de satélite
      </label>
    </div>

    <hr />

    <div>
      <NotSelected v-if="currentMode=='none'" />
      <FixedPosition v-if="currentMode=='fixed'" />
      <TrackSatellite v-if="currentMode=='track'" />
    </div>

    <hr />
  </div>
</template>

<script>
import FixedPosition from "@/components/FixedPosition";
import NotSelected from "@/components/NotSelected";
import TrackSatellite from "@/components/TrackSatellite";

export default {
  name: "home",

  components: {
    FixedPosition,
    NotSelected,
    TrackSatellite
  },

  data() {
    return {
      currentMode: "track"
    };
  },

  methods: {
    setMode(mode) {
      this.currentMode = mode;
    }
  }
};
</script>
