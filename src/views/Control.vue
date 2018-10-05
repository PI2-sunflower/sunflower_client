<template>
  <div class="row">
    <div class="col col-6">
      <div class="row">
        <div class="col col-12">
          <div class="form-group">
            <label for="ang">Angulo</label>
            <input id="ang" type="number" class="form-control" placeholder="0.0" v-model="angle" />
            <small class="err-message" v-if="errMessage !== ''">{{errMessage}}</small>
          </div>

          <div class="form-group">
            <label for="axis">Eixo</label>

            <div class="row">

              <div class="col col-4">
                <div :class="'axisbox btn ' + (axis == 'A' ? 'active' : '')" @click="setAxis('A')">
                  A
                </div>
              </div>

              <div class="col col-4">
                <div :class="'axisbox btn ' + (axis == 'B' ? 'active' : '')" @click="setAxis('B')">
                  B
                </div>
              </div>

              <div class="col col-4">
                <div :class="'axisbox btn ' + (axis == 'C' ? 'active' : '')" @click="setAxis('C')">
                  C
                </div>
              </div>
            </div>
          </div>

          <br />

          <button class="btn btn-primary" @click="dispatchDirection">
            Enviar direções
          </button>
        </div><!-- /col-12 -->

        <div class="col col-12">

          <hr />

          <span>Histórico de comandos</span>

          <ul class="list-group list-group-flush command-list">
            <li v-for="(h, i) in control.history" :key="i" class="list-group-item">
              G angle={{h.angle}}; axis={{h.axis}}
            </li>
          </ul>
        </div>
      </div><!-- /row -->
    </div>

    <div class="col col-6">
      <div id="cam-container">
        Video da câmera
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Control",

  data() {
    return {
      angle: 0,
      axis: "B",
      errMessage: ""
    };
  },

  computed: {
    ...mapState(["control"])
  },

  methods: {
    isVallidAngle() {
      let angle = parseFloat(this.angle);

      if (isNaN(angle) || angle < -360.0 || angle > 360.0) {
        this.errMessage = "Apenas angulos entre -360.0 a 360.0 são permitidos";
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

      let command = {
        angle: this.angle,
        axis: this.axis
      };

      this.$store.dispatch("addControlCommand", command);
    }
  }
};
</script>

<style>
.err-message {
  color: #dc3545;
  margin-left: 10px;
}
.axisbox {
  width: 80px;
  height: 80px;
  padding: 0px;
  border: solid 1px #000;
}
.axisbox:hover {
  border: solid 1px orange;
}
.axisbox.active {
  border: solid 1px blue;
  background-color: #d4d4d4;
}
.axisbox img {
  width: 80px;
  height: 80px;
}
.command-list {
  max-height: 200px;
  overflow: auto;
}
.command-list li:nth-child(even) {
  background-color: #dee2e6;
}
</style>
