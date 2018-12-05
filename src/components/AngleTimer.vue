<template>
  <div class="row">
    <div class="col col-12 conf-field">
      <div class="form-inline">
        <div class="col col-3 angle-label">
          <label for="angle_1">Azimutal</label> &nbsp;
        </div>

        <div class="col col-3">
          <input
            id="angle_1"
            type="number"
            class="form-control"
            placeholder="0.0"
            v-model="angle_1"
          />
        </div>
      </div>
    </div><!-- /col-12 -->

    <div class="col col-12 conf-field">
      <div class="form-inline">
        <div class="col col-3 angle-label">
          <label for="step">Passo</label> &nbsp;
        </div>

        <div class="col col-3">
          <input
            id="step"
            type="number"
            class="form-control"
            placeholder="0.0"
            v-model="step"
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
            id="step"
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
export default {
  name: "AngleTimer",

  data() {
    return {
      message: "",
      sendingRequest: false,
      timerIsActive: false,

      angle_1: 0,
      step: 1,
      time: 0
    };
  },

  methods: {
    activateTimer() {
      alert("START !");

      this.sendingRequest = true;
      window.setTimeout(() => {
        this.timerIsActive = true;
        this.sendingRequest = false;
      }, 3000);
    },

    deactivateTimer() {
      console.log("DIE !");

      this.sendingRequest = true;
      window.setTimeout(() => {
        this.timerIsActive = false;
        this.sendingRequest = false;
      }, 3000);
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
