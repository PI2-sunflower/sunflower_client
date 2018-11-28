<template>
  <div class="DownMovement row">
    <div class="col col-4">
      <div
        class="btn btn-outline-primary"
        @click="activeArm"
      >
        <font-awesome-icon icon="level-up-alt" />
        &nbsp;
        <span>Levantar</span>
      </div>
    </div><!-- /.col-4 -->

    <div class="col col-4">
      <div
        class="btn btn-outline-primary"
        @click="deactiveArm"
      >
        <font-awesome-icon icon="level-down-alt" />
        &nbsp;
        <span>Abaixar</span>
      </div>
    </div><!-- /.col-4 -->

    <div class="col col-4">
      <div
        class="btn btn-outline-primary"
        @click="stopArm"
      >
        <font-awesome-icon icon="stop-circle" />
        &nbsp;
        <span>Parar</span>
      </div>
    </div><!-- /.col-4 -->

    <div class="col col-4">
      <div
        class="btn btn-outline-primary"
        @click="expandArm"
      >
        <font-awesome-icon icon="stop-circle" />
        &nbsp;
        <span>Expandir</span>
      </div>
    </div><!-- /.col-4 -->

    <div class="col col-4">
      <div
        class="btn btn-outline-primary"
        @click="retractArm"
      >
        <font-awesome-icon icon="stop-circle" />
        &nbsp;
        <span>Retrair</span>
      </div>
    </div><!-- /.col-4 -->

    <div class="col col-4">
      <div
        class="btn btn-outline-primary"
        @click="unlockArm"
      >
        <font-awesome-icon icon="stop-circle" />
        &nbsp;
        <span>Liberar braço</span>
      </div>
    </div><!-- /.col-4 -->

    <div class="col col-4">
      <div
        class="btn btn-outline-primary"
        @click="goHomeArm"
      >
        <font-awesome-icon icon="stop-circle" />
        &nbsp;
        <span>Posição inicial</span>
      </div>
    </div><!-- /.col-4 -->
  </div><!-- /.row -->
</template>

<script>
import axios from "../services/axios-setup";

export default {
  name: "UpDownMovement",

  methods: {
    async sendMqtt(action) {
      this.$store.dispatch("setArmLoading", true);

      try {
        this.$store.dispatch("setArmLoading", false);

        let { data } = await axios.post("/mqtt-dispatch", { ...action });

        //let command = `Topic=${topic}; Code=${code}`;
        //this.$store.dispatch("addControlCommand", command);

        this.$store.dispatch("setArmReady", !!data.dispatch);
      } catch (e) {
        console.log(e);
        this.loadingArm = false;
        this.$store.dispatch("setArmReady", false);
      }
    },

    activeArm() {
      this.sendMqtt({
        command: "go_up"
      });
    },

    deactiveArm() {
      this.sendMqtt({
        command: "go_down"
      });
    },

    stopArm() {
      this.sendMqtt({
        command: "stop_up_down"
      });
    },

    expandArm() {
      this.sendMqtt({
        command: "expand"
      });
    },

    retractArm() {
      this.sendMqtt({
        command: "retract"
      });
    },

    unlockArm() {
      this.sendMqtt({
        command: "unlock"
      });
    },

    goHomeArm() {
      this.sendMqtt({
        command: "go_home"
      });
    }
  }
};
</script>

<style>
</style>
