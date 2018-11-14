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

          <div v-if="controlTab == 'a'">

            <div class="form-group">
              <label for="ang">Angulo</label>
              <input id="ang" type="number" class="form-control" placeholder="0.0" v-model="angle" />
              <small class="err-message" v-if="errMessage !== ''">{{errMessage}}</small>
            </div>

            <div class="form-group">
              <label for="axis">Eixo</label>

              <div class="row">
                <div class="col col-4">
                  <div :class="'ax-rotate axisbox btn btn-outline-primary ' + (axis == 'A' ? 'active' : '')" @click="setAxis('A')">
                    <font-awesome-icon icon="arrows-alt" />
                  </div>
                </div>

                <div class="col col-4">
                  <div :class="'ax-rot-y axisbox btn btn-outline-primary ' + (axis == 'B' ? 'active' : '')" @click="setAxis('B')">
                    <font-awesome-icon icon="arrows-alt" />
                  </div>
                </div>

                <div class="col col-4">
                  <div :class="'ax-rot-x axisbox btn btn-outline-primary ' + (axis == 'C' ? 'active' : '')" @click="setAxis('C')">
                    <font-awesome-icon icon="arrows-alt" />
                  </div>
                </div>
              </div>
            </div>

            <br />

            <button class="btn btn-primary" @click="dispatchDirection">
              Enviar direções
            </button>
          </div><!-- ./controlTab == 'a' -->
        </div><!-- /col-12 -->

        <div class="col col-12">

          <hr />

          <span>Histórico de comandos</span>

          <ul class="list-group list-group-flush command-list">
            <li v-for="(command, i) in control.history" :key="i" class="list-group-item">
              {{command}}
            </li>
          </ul>
        </div>
      </div><!-- /row -->
    </div>

    <div class="col col-6">
      <Camera />
    </div>
  </div>
</template>

<script>
import axios from "../services/axios-setup";
import { mapState } from "vuex";

import Camera from "../components/Camera";
import UpDownMovement from "../components/UpDownMovement";

export default {
  name: "Control",

  components: {
    Camera,
    UpDownMovement
  },

  data() {
    return {
      controlTab: "b",
      angle: 0,
      axis: "B",
      errMessage: ""
    };
  },

  computed: {
    ...mapState(["control"])
  },

  methods: {
    setTab(tab) {
      this.controlTab = tab;
    },

    isVallidAngle() {
      let angle = parseFloat(this.angle);

      if (isNaN(angle) || angle < -0 || angle > 360.0) {
        this.errMessage = "Apenas angulos entre 0 a 360.0 são permitidos";
        return false;
      } else {
        this.errMessage = "";
        return true;
      }
    },

    setAxis(axis) {
      this.axis = axis;
    },

    dispatchDirection() {
      if (!this.isVallidAngle()) {
        return;
      }

      let command = `Angle=${this.angle}; Axis=${this.axis}`;
      this.$store.dispatch("addControlCommand", command);

      this.sendMQTT();
    },

    async sendMQTT() {
      try {
        let { data } = await axios.post("/mqtt-dispatch", {
          command: "move_axis",
          params: {
            angle_1: 10,
            angle_2: 20,
            angle_3: 30
          }
        });
      } catch (e) {}
    }
  }
};
</script>

<style>
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
.command-list {
  max-height: 200px;
  overflow: auto;
}
.command-list li:nth-child(even) {
  background-color: #dee2e6;
}
.ax-rotate svg {
  animation: roll 2s infinite linear;
  animation-direction: normal;
}

.ax-rot-y svg {
  animation: rotY 2s infinite linear;
  animation-direction: normal;
}

.ax-rot-x svg {
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

.controlTab {
  cursor: pointer;
}

.controlTab.active {
  color: rgb(0, 123, 255) !important;
}
</style>
