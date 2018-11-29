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

    <div
      :class="'col col-12 ' + (error ? 'message-err' : 'message-ok')"
      v-if="message !== ''"
    >
      <small>{{message}}</small>
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
      error: false,
      message: "",
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
      this.error = true;
      this.message = "Não pode obter dados do braço";
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
      this.message = this.validateAngles();

      if (this.message.length > 0) {
        this.error = true;
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

        if (data.updated) {
          this.message = "Dados atualizados com sucesso";
          this.error = false;
        } else {
          this.message = "Falha na atualização";
          this.error = true;
        }
      } catch (e) {
        this.message = "Não pode enviar os dados";
        this.error = true;
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
.message-ok {
  margin-bottom: 15px;
  color: rgb(40, 167, 69);
}
</style>
