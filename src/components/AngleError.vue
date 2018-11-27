<template>
  <fieldset>
    <legend class="col-form-label">Erro dos ângulos</legend>

    <div class="form-group">
      <label for="err_angle_1">Azimutal</label>

      <input
        type="number"
        class="form-control"
        id="err_angle_1"
        placeholder="0.0"
        v-model="angle_1"
      >
      <small
        class="form-text value-error"
        v-if="error1"
      >Valor inválido</small>
    </div>

    <div class="form-group">
      <label for="err_angle_2">Elevação</label>

      <input
        type="number"
        class="form-control"
        id="err_angle_2"
        placeholder="0.0"
        v-model="angle_2"
      >
      <small
        class="form-text value-error"
        v-if="error2"
      >Valor inválido</small>
    </div>

    <div class="form-group">
      <label for="err_angle_3">Parabólica</label>

      <input
        type="number"
        class="form-control"
        id="err_angle_3"
        placeholder="0.0"
        v-model="angle_3"
      >
      <small
        class="form-text value-error"
        v-if="error3"
      >Valor inválido</small>
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

      error1: false,
      error2: false,
      error3: false,
    }
  },

  watch: {
    angle_1(newData) {
      let [error, value] = this.validateValue(newData); 
      this.error1 = error;

      if (error === false) {
        this.setAngleError("angle_1", value);
      }
    },

    angle_2(newData) {
      let [error, value] = this.validateValue(newData); 
      this.error2 = error;

      if (error === false) {
        this.setAngleError("angle_2", value);
      }
    },

    angle_3(newData) {
      let [error, value] = this.validateValue(newData); 
      this.error3 = error;

      if (error === false) {
        this.setAngleError("angle_3", value);
      }
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
      let { angle_1, angle_2, angle_3 } = newAngleError;

      this.angle_1 = angle_1;
      this.angle_2 = angle_2;
      this.angle_3 = angle_3;
    },

    validateValue(value) {
      let parsed = parseFloat(value);

      return [isNaN(parsed), parsed];
    }
  }
}
</script>

<style scoped>
.value-error {
  color: rgb(200, 35, 51);
}
</style>
