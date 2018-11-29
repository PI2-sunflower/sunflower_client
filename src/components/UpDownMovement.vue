<template>
  <div class="DownMovement row">
    <div class="col col-3">
      <div
        :class="'btn btn-outline-primary btn-sm ' + (okToDispatch === false ? 'disabled' : '')"
        @click="activeArm"
      >
        <font-awesome-icon icon="level-up-alt" />
        &nbsp;
        <span>Levantar</span>
      </div>
    </div><!-- /.col-3 -->

    <div class="col col-3">
      <div
        :class="'btn btn-outline-primary btn-sm ' + (okToDispatch === false ? 'disabled' : '')"
        @click="deactiveArm"
      >
        <font-awesome-icon icon="level-down-alt" />
        &nbsp;
        <span>Abaixar</span>
      </div>
    </div><!-- /.col-3 -->

    <div class="col col-3">
      <div
        :class="'btn btn-outline-primary btn-sm ' + (okToDispatch === false ? 'disabled' : '')"
        @click="stopArm"
      >
        <font-awesome-icon icon="stop-circle" />
        &nbsp;
        <span>Parar</span>
      </div>
    </div><!-- /.col-3 -->

    <div class="col col-3">
      <div
        :class="'btn btn-outline-primary btn-sm ' + (okToDispatch === false ? 'disabled' : '')"
        @click="expandArm"
      >
        <font-awesome-icon icon="angle-double-up" />
        &nbsp;
        <span>Expandir</span>
      </div>
    </div><!-- /.col-3 -->

    <div class="col col-3">
      <div
        :class="'btn btn-outline-primary btn-sm ' + (okToDispatch === false ? 'disabled' : '')"
        @click="retractArm"
      >
        <font-awesome-icon icon="angle-double-down" />
        &nbsp;
        <span>Retrair</span>
      </div>
    </div><!-- /.col-3 -->

    <div class="col col-3">
      <div
        :class="'btn btn-outline-primary btn-sm ' + (okToDispatch === false ? 'disabled' : '')"
        @click="unlockArm"
      >
        <font-awesome-icon icon="unlock-alt" />
        &nbsp;
        <span>Liberar braço</span>
      </div>
    </div><!-- /.col-3 -->

    <div class="col col-3">
      <div
        :class="'btn btn-outline-primary btn-sm ' + (okToDispatch === false ? 'disabled' : '')"
        @click="goHomeArm"
      >
        <font-awesome-icon icon="anchor" />
        &nbsp;
        <span>Posição inicial</span>
      </div>
    </div><!-- /.col-3 -->
  </div><!-- /.row -->
</template>

<script>
import { mapState } from "vuex";
import axios from "../services/axios-setup";

export default {
  name: "UpDownMovement",

  data() {
    return {
      sendingCommand: false
    };
  },

  computed: {
    ...mapState(["arm"]),

    okToDispatch() {
      return !this.sendingCommand && this.arm.status === "alive";
    }
  },

  methods: {
    async sendMqtt(action) {
      if (!this.okToDispatch) {
        return;
      }

      this.sendingCommand = true;

      try {
        await axios.post("/mqtt-dispatch", { ...action });
      } catch (e) {
        console.log(e);
      } finally {
        window.setTimeout(() => {
          this.sendingCommand = false;
        }, 3000);
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

<style scoped>
.DownMovement .col {
  margin-bottom: 15px;
}
</style>
