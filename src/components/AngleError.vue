<template>
  <fieldset>
    <legend class="col-form-label">Offset dos ângulos</legend>

    <div class="form-group">
      <label for="err_angle_1">Azimutal</label>

      <input
        type="text"
        class="form-control"
        id="err_angle_1"
        placeholder="0.0"
        v-model="angle_1"
      >
    </div>

    <div class="form-group">
      <label for="err_angle_2">Elevação</label>

      <input
        type="text"
        class="form-control"
        id="err_angle_2"
        placeholder="0.0"
        v-model="angle_2"
      >
    </div>

    <div class="form-group">
      <label for="err_angle_3">Parabólica</label>

      <input
        type="text"
        class="form-control"
        id="err_angle_3"
        placeholder="0.0"
        v-model="angle_3"
      >
    </div>

    <div class="form-group">
      <label for="mag">Magnetômetro</label>
      <input
        type="text"
        class="form-control"
        id="mag"
        v-model="magnetometer"
      >
    </div>

    <div class="form-group">
      <label for="engine">Velocidade do motor</label>
      <input
        type="text"
        class="form-control"
        id="engine"
        v-model="engine_speed"
      >
    </div>
  </fieldset>
</template>

<script>
export default {
  name: "AngleError",

  props: {
    angleError: Object,
    setAngleError: Function
  },

  data() {
    return {
      angle_1: 0.0,
      angle_2: 0.0,
      angle_3: 0.0,
      magnetometer: 0.0,
      engine_speed: 0
    };
  },

  watch: {
    angle_1(newData) {
      this.setAngleError("angle_1", newData);
    },

    angle_2(newData) {
      this.setAngleError("angle_2", newData);
    },

    angle_3(newData) {
      this.setAngleError("angle_3", newData);
    },

    magnetometer(newData) {
      this.setAngleError("magnetometer", newData);
    },

    engine_speed(newData) {
      this.setAngleError("engine_speed", newData);
    },

    angleError(newAngleError) {
      this.setAnglesErrors(newAngleError);
    }
  },

  mounted() {
    this.setAnglesErrors(this.angleError);
  },

  methods: {
    setAnglesErrors(newAngleError) {
      let {
        angle_1,
        angle_2,
        angle_3,
        magnetometer,
        engine_speed
      } = newAngleError;

      this.angle_1 = angle_1;
      this.angle_2 = angle_2;
      this.angle_3 = angle_3;
      this.magnetometer = magnetometer;
      this.engine_speed = engine_speed;
    }
  }
};
</script>

<style scoped>
.value-error {
  color: rgb(200, 35, 51);
}
</style>
