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
        angle_1: 1.0,
        angle_2: 2.0,
        angle_3: 3.0,
      }
    }
  },

  components: {
    OperationMode,
    AngleError
  },

  methods: {
    setOperationMode(newOp) {
      if(newOp === "a" || newOp === "b") {
        this.currentOp = newOp;
      }
    },

    setAngleError(angle, value) {
      this.angleError[angle] = value;
    },

    async dispatchUpdate() {
      try {
        let postData = {
          operation: this.currentOp,
          angles: this.angleError
        };

        let { status, data } = await axios.post("/update-general-params", {
          ...postData
        });
        console.log(status);
        console.log(data);
      } catch(e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>
