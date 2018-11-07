<template>
  <div class="DownMovement row">
    <div class="col col-4">
      <div class="btn btn-outline-primary" @click="activeArm">
        <font-awesome-icon icon="level-up-alt" />
        &nbsp;
        <span>Levantar</span>
      </div>
    </div><!-- /.col-4 -->

    <div class="col col-4">
      <div class="btn btn-outline-primary" @click="deactiveArm">
        <font-awesome-icon icon="level-down-alt" />
        &nbsp;
        <span>Abaixar</span>
      </div>
    </div><!-- /.col-4 -->

    <div class="col col-4">
      <div class="btn btn-outline-primary" @click="stopArm">
        <font-awesome-icon icon="stop-circle" />
        &nbsp;
        <span>Parar</span>
      </div>
    </div><!-- /.col-4 -->
  </div><!-- /.row -->
</template>

<script>
import axios from "../services/axios-setup";

export default {
  name: "UpDownMovement",

  methods: {
    async sendMqtt({ code, topic }) {
      this.$store.dispatch("setArmLoading", true);

      try {
        this.$store.dispatch("setArmLoading", false);

        let { data } = await axios.post("/mqtt-dispatch", { code, topic });

        let command = `Topic=${topic}; Code=${code}`;
        this.$store.dispatch("addControlCommand", command);

        this.$store.dispatch("setArmReady", !!data.dispatch);
      } catch (e) {
        console.log(e);
        this.loadingArm = false;
        this.$store.dispatch("setArmReady", false);
      }
    },

    activeArm() {
      this.sendMqtt({
        code: "up",
        topic: "movement/up_down"
      });
    },

    deactiveArm() {
      this.sendMqtt({
        code: "down",
        topic: "movement/up_down"
      });
    },

    stopArm() {
      this.sendMqtt({
        code: "stop",
        topic: "movement/up_down"
      });
    }
  }
};
</script>

<style>
</style>
