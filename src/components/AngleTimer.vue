<template>
  <div class="row">
    <div class="col col-12 conf-field">
      <div style="text-align: center">Azimutal</div>
      <br />
      <div class="form-inline">
        <div class="col col-3 angle-label">
          <label for="start_angle">Início</label> &nbsp;
        </div>

        <div class="col col-3">
          <input
            id="start_angle"
            type="number"
            class="form-control"
            placeholder="0.0"
            v-model="start_angle"
          />
        </div>
      </div>
    </div><!-- /col-12 -->

    <div class="col col-12 conf-field">
      <div class="form-inline">
        <div class="col col-3 angle-label">
          <label for="end_angle">Fim</label> &nbsp;
        </div>

        <div class="col col-3">
          <input
            id="end_angle"
            type="number"
            class="form-control"
            placeholder="0.0"
            v-model="end_angle"
          />
        </div>
      </div>
    </div><!-- /col-12 -->

    <div class="col col-12 conf-field">
      <div class="form-inline">
        <div class="col col-3 angle-label">
          <label for="time">
            Tempo <small>(segundos)</small>
          </label> &nbsp;
        </div>

        <div class="col col-3">
          <input
            id="end_angle"
            type="number"
            class="form-control"
            placeholder="60"
            v-model="time"
          />
        </div>
      </div>
    </div><!-- /col-12 -->

    <div class="col col-12">
      <small class="message">{{message}}</small>
      <hr />
      <button
        :class="'btn btn-' + (sendingRequest ? 'warning': 'primary')"
        @click="activateTimer"
        v-if="timerIsActive == false"
      >
        Acionar timer
      </button>

      <button
        :class="'btn btn-' + (sendingRequest ? 'warning': 'danger')"
        @click="deactivateTimer"
        v-if="timerIsActive == true"
      >
        Desativar timer
      </button>

      <font-awesome-icon
        icon="spinner"
        class="it-is-spinning spin-big"
        v-if="sendingRequest"
      />
    </div><!-- /col-12 -->
  </div>
</template>

<script>
import axios from "../services/axios-setup";

export default {
  name: "AngleTimer",

  data() {
    return {
      message: "",
      sendingRequest: false,
      timerIsActive: false,

      start_angle: 0,
      end_angle: 1,
      time: 0
    };
  },

  mounted() {
    this.fetchTimerIsActive();
  },

  destroyed() {
    this.deactivateTimer();
  },

  methods: {
    async fetchTimerIsActive() {
      try {
        let { data } = await axios.get("/timer-is-active");
        this.timerIsActive = data.is_active;

        if (this.timerIsActive) {
          window.setTimeout(() => {
            this.fetchTimerIsActive();
          }, 1000);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async activateTimer() {
      this.sendingRequest = true;

      try {
        const { start_angle, end_angle, time } = this;

        const { data } = await axios.post("start-timer", {
          start_angle,
          end_angle,
          time
        });

        console.log(data);
        this.timerIsActive = true;

        this.fetchTimerIsActive();
      } catch (e) {
        this.timerIsActive = false;
        console.log(e);
      } finally {
        this.sendingRequest = false;
      }
    },

    async deactivateTimer() {
      this.sendingRequest = true;
      try {
        await axios.get("/stop-timer");
        this.timerIsActive = false;
      } catch (e) {
        console.log(e);
      } finally {
        this.sendingRequest = false;
      }
    }
  }
};
</script>

<style scoped>
.angle-label {
  line-height: 0px;
}

.conf-field {
  margin-bottom: 10px;
}

.it-is-spinning {
  margin-left: 10px;
  color: rgb(255, 193, 7);
  animation: full-roll 2s infinite linear;
  animation-direction: normal;
}

@keyframes full-roll {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
