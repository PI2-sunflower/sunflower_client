<template>
  <fieldset>
    <legend class="col-form-label">Posição do braço</legend>
    <div class="position-form">
      <div class="form-group">
        <label for="lat">Latitude</label>
        <input type="text" class="form-control" id="lat" v-model="latitude">
      </div>

      <div class="form-group">
        <label for="long">Longitude</label>
        <input type="text" class="form-control" id="long" v-model="longitude">
      </div>

      <div class="form-group">
        <label for="alt">Altitude</label>
        <input type="text" class="form-control" id="alt" v-model="altitude">
      </div>

      <div class="form-group">
        <label for="mag">Magnetômetro</label>
        <input type="text" class="form-control" id="mag" v-model="magnetometer">
      </div>

      <div class="form-group">
        <label for="engine">Velocidade do motor</label>
        <input type="text" class="form-control" id="engine" v-model="engine_speed">
      </div>
    </div>

    <div :class="error ? 'message-err' : 'message-ok'" v-if="message !== ''">
      <small>{{message}}</small>
    </div>

    <br />
    <button class="btn btn-outline-primary" @click="getFromNavigator">
      Obter pelo navegador
    </button>
    &nbsp;
    <button class="btn btn-primary" @click="updatePosition" :disabled="sendingData">Atualizar Posição</button>
    <font-awesome-icon icon="spinner" class="it-is-spinning spin-big" v-if="sendingData" />
  </fieldset>
</template>


<script>
import axios from "../services/axios-setup";

export default {
  name: "PositionConfig",

  data() {
    return {
      latitude: 0,
      longitude: 0,
      altitude: 0,
      magnetometer: 0,
      engine_speed: 0,

      sendingData: false,
      message: "",
      error: false
    };
  },

  async mounted() {
    const URL = "/get-arm-position";
    try {
      let { status, data } = await axios.get(URL);

      if (status === 200) {
        this.updateLocalState(data);
      } else {
        this.setErrorMessage("Não pode obter os dados do servidor");
      }
    } catch (e) {
      this.setErrorMessage("Não pode obter os dados do servidor");
      console.lor(e);
    }
  },

  methods: {
    getFromNavigator() {
      navigator.geolocation.getCurrentPosition(position => {
        let { latitude, longitude, altitude, engine_speed } = position.coords;

        if (latitude !== null) this.latitude = latitude;
        if (longitude !== null) this.longitude = longitude;
        if (altitude !== null) this.altitude = altitude;
        if (engine_speed !== null) this.engine_speed = engine_speed;
      });
    },

    async updatePosition() {
      if (this.validateData() === false) {
        return;
      }

      const {
        latitude,
        longitude,
        altitude,
        magnetometer,
        engine_speed
      } = this;
      this.sendingData = true;

      try {
        await axios.post("/set-arm-position", {
          latitude,
          longitude,
          altitude,
          magnetometer,
          engine_speed
        });

        this.error = false;
        this.message = "Posição atualizada com sucesso";
        this.updateLocalState({
          latitude,
          longitude,
          altitude,
          magnetometer,
          engine_speed
        });
      } catch (e) {
        this.setErrorMessage("Não foi possível atualizar a posição");
        console.log(e);
      } finally {
        this.sendingData = false;
      }
    },

    validateData() {
      let { latitude, longitude, altitude, magnetometer, engine_speed } = this;

      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);
      altitude = parseFloat(altitude);
      magnetometer = parseFloat(magnetometer);
      engine_speed = parseInt(engine_speed);

      const invalidField = field => `${field} é um número inválido.`;

      if (isNaN(latitude)) {
        this.setErrorMessage(invalidField("Latitude"));
        return false;
      } else this.latitude = latitude;

      if (isNaN(longitude)) {
        this.setErrorMessage(invalidField("Longitude"));
        return false;
      } else this.longitude = longitude;

      if (isNaN(altitude)) {
        this.setErrorMessage(invalidField("Altitude"));
        return false;
      } else this.altitude = altitude;

      if (isNaN(magnetometer)) {
        this.setErrorMessage(invalidField("Magnetômetro"));
        return false;
      } else this.magnetometer = magnetometer;

      if (isNaN(engine_speed) || (engine_speed < 0 || engine_speed > 1000)) {
        this.setErrorMessage("Velocidade do motor deve estar entre 0 a 1000");
        return false;
      } else this.engine_speed = engine_speed;

      return true;
    },

    setErrorMessage(message) {
      this.error = true;
      this.message = message;
    },

    updateLocalState({
      latitude,
      longitude,
      altitude,
      magnetometer,
      engine_speed
    }) {
      this.latitude = latitude;
      this.altitude = altitude;
      this.longitude = longitude;
      this.magnetometer = magnetometer;
      this.engine_speed = engine_speed;

      this.$store.dispatch("setPositions", {
        latitude,
        longitude,
        altitude,
        magnetometer,
        engine_speed
      });
    }
  }
};
</script>

<style scoped>
.message-ok {
  color: rgb(40, 167, 69);
}
.message-err {
  color: rgb(200, 35, 51);
}
</style>