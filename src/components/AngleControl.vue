<template>
  <div class="angle-control row">
    <div class="col col-12 row axis" v-for="angle in angles" :key="angle.index">
      <div class="col col-12">
        <div class="form-inline">
          <div class="col col-3 angle-label">
            <label :for="'angle_' + angle.index">{{angle.name}}</label> &nbsp;
          </div>

          <div class="col col-3">
            <input :id="'angle_' + angle.index" type="number" class="form-control" placeholder="0.0" v-model="angle.value" />
          </div>
        </div>
      </div>
    </div>

    <div class="col col-12">
      <small class="err-message">{{message}}</small>
      <hr />
      <button :class="'btn btn-' + (sendingRequest ? 'warning': 'primary')" @click="sendDirections">
        Enviar direções
      </button>

      <font-awesome-icon icon="spinner" class="it-is-spinning spin-big" v-if="sendingRequest" />
    </div>
  </div>
</template>

<script>
import axios from "../services/axios-setup";

export default {
  name: "AngleControl",

  data() {
    return {
      angles: [
        { index: 1, value: 1, name: "Azimutal" },
        { index: 2, value: 2, name: "Elevação" },
        { index: 3, value: 3, name: "Parabólica" }
      ],

      sendingRequest: false,
      message: ""
    };
  },

  methods: {
    async sendDirections() {
      const params = this.getParams();
      this.sendingRequest = true;
      this.message = "";

      try {
        let { data } = await axios.post("/mqtt-dispatch", {
          command: "move_axis",
          params
        });

        console.log(JSON.stringify(data, null, 2));
        this.message = data.message;
      } catch (e) {
        console.log(e);
        this.message = "Não pode se conectar ao servidor";
      } finally {
        this.sendingRequest = false;
      }
    },

    getParams() {
      return this.angles.reduce((acc, curr) => {
        return {
          ...acc,
          [`angle_${curr.index}`]: parseInt(curr.value)
        };
      }, {});
    }
  }
};
</script>

<style scoped>
.angle-label {
  line-height: 0px;
}

.err-message {
  color: #dc3545;
  margin-left: 10px;
}

.axisbox svg {
  font-size: 30px;
}

.axisbox.active {
  background-color: #007bff;
  color: #fff;
}

.axis {
  margin-bottom: 10px;
}

.axis .disabled {
  text-decoration: line-through;
}

.ax-rotate-1 svg {
  animation: roll 2s infinite linear;
  animation-direction: normal;
}

.ax-rotate-2 svg {
  animation: rotY 2s infinite linear;
  animation-direction: normal;
}

.ax-rotate-3 svg {
  animation: rotX 2s infinite linear;
  animation-direction: normal;
}

@keyframes roll {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(180deg);
  }
}

@keyframes rotY {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
}

@keyframes rotX {
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(180deg);
  }
}
</style>
