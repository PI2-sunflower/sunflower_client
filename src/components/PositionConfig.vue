<template>
  <fieldset>
    <legend class="col-form-label">Posição do braço</legend>
    <div class="position-form">
      <div class="form-group">
        <label for="lat">Latitude</label>
        <input
          type="text"
          class="form-control"
          id="lat"
          v-model="latitude"
        >
      </div>

      <div class="form-group">
        <label for="long">Longitude</label>
        <input
          type="text"
          class="form-control"
          id="long"
          v-model="longitude"
        >
      </div>

      <div class="form-group">
        <label for="alt">Altitude</label>
        <input
          type="text"
          class="form-control"
          id="alt"
          v-model="altitude"
        >
      </div>
    </div>

    <div
      :class="error ? 'message-err' : 'message-ok'"
      v-if="message !== ''"
    >
      <small>{{message}}</small>
    </div>

    <br />
    <button
      class="btn btn-outline-primary"
      @click="getFromNavigator"
    >
      Obter pelo navegador
    </button>
    &nbsp;
    <button
      class="btn btn-primary"
      @click="updatePosition"
      :disabled="sendingData"
    >Atualizar Posição</button>
    <font-awesome-icon
      icon="spinner"
      class="it-is-spinning spin-big"
      v-if="sendingData"
    />
  </fieldset>
</template>


<script>
import axios from "../services/axios-setup";
import fetchPosition from "../services/fetch-position";

export default {
  name: "PositionConfig",

  data() {
    return {
      latitude: 0,
      longitude: 0,
      altitude: 0,

      sendingData: false,
      message: "",
      error: false
    };
  },

  async mounted() {
    let { error, data } = await fetchPosition();

    if (error.length === 0) {
      this.updateLocalState(data);
    } else {
      this.setErrorMessage(error);
    }
  },

  methods: {
    getFromNavigator() {
      navigator.geolocation.getCurrentPosition(position => {
        let { latitude, longitude, altitude } = position.coords;

        if (latitude !== null) this.latitude = latitude;
        if (longitude !== null) this.longitude = longitude;
        if (altitude !== null) this.altitude = altitude;
      });
    },

    async updatePosition() {
      if (this.validateData() === false) {
        return;
      }

      const { latitude, longitude, altitude } = this;
      this.sendingData = true;

      try {
        let { data } = await axios.post("/set-arm-position", {
          latitude,
          longitude,
          altitude
        });

        if (data.updated === true) {
          this.error = false;
          this.message = "Posição atualizada com sucesso";
          this.updateLocalState({
            latitude,
            longitude,
            altitude
          });
        } else {
          this.setErrorMessage("Não foi possível atualizar a posição");
        }
      } catch (e) {
        this.setErrorMessage("Não foi possível atualizar a posição");
        console.log(e);
      } finally {
        this.sendingData = false;
      }
    },

    validateData() {
      let { latitude, longitude, altitude } = this;

      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);
      altitude = parseFloat(altitude);

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

      return true;
    },

    setErrorMessage(message) {
      this.error = true;
      this.message = message;
    },

    updateLocalState({ latitude, longitude, altitude }) {
      this.latitude = latitude;
      this.altitude = altitude;
      this.longitude = longitude;

      this.$store.dispatch("setPositions", {
        latitude,
        longitude,
        altitude
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
