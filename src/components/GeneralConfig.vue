<template>
  <div class="row">
    <div class="col col-12">
      <OperationMode
        :currentOp="currentOp"
        :setOperationMode="setOperationMode"
      />
    </div>

    <div class="col col-12">
      <AngleError
        :angleError="angleError"
        :setAngleError="setAngleError"
      />
    </div>

    <div class="col col-12 message-err">
      <small>{{errorMessage}}</small>
    </div>

    <div class="col col-12">
      <button
        class="btn btn-primary"
        @click="dispatchUpdate"
      >Atualizar Parâmetros</button>
    </div>
  </div>
</template>

<script>
import axios from "../services/axios-setup";

import OperationMode from "./OperationMode";
import AngleError from "./AngleError";

export default {
  name: "GeneralConfig",

  data() {
    return {
      currentOp: "b",
      angleError: {
        angle_1: 0.0,
        angle_2: 0.0,
        angle_3: 0.0
      },
      errorMessage: "",
      names: ["Azimutal", "Elevação", "Parabólica"]
    };
  },

  components: {
    OperationMode,
    AngleError
  },

  async mounted() {
    try {
      let { data } = await axios.get("/get-arm-data");
      let angleError = {
        angle_1: data.error_angle_1,
        angle_2: data.error_angle_2,
        angle_3: data.error_angle_3
      };

      this.currentOp = data.operation;
      this.angleError = angleError;
    } catch (e) {
      console.log("Nao pode obter arm data");
      console.log(e);
    }
  },

  methods: {
    setOperationMode(newOp) {
      if (newOp === "a" || newOp === "b") {
        this.currentOp = newOp;
      }
    },

    setAngleError(angle, value) {
      this.angleError[angle] = value;
    },

    validateAngles() {
      const angles = Object.keys(this.angleError);

      for (let i = 0; i < angles.length; ++i) {
        let value = parseFloat(this.angleError[angles[i]]);

        if (isNaN(value)) {
          return "Valor inválido em " + this.names[i];
        }
      }

      return "";
    },

    async dispatchUpdate() {
      this.errorMessage = this.validateAngles();

      if (this.errorMessage.length > 0) {
        return;
      }

      try {
        let postData = {
          operation: this.currentOp,
          angles: this.angleError
        };

        let { status, data } = await axios.post("/set-arm-data", {
          ...postData
        });
        console.log(status);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.message-err {
  margin-bottom: 15px;
  color: rgb(200, 35, 51);
}
</style>
