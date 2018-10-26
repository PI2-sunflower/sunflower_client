<template>
  <div id="main-container" class="container">
    <div class="row">
      <nav class="col col-10">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <span class="navbar-brand disabled">Modo: </span>
          </li>

          <li class="nav-item">
            <router-link active-class="active" to="/tracker" class="nav-link">
              <font-awesome-icon icon="globe-americas" />
              Rastreador
            </router-link>
          </li>

          <li class="nav-item">
            <router-link active-class="active" to="/control" class="nav-link">
              <font-awesome-icon icon="gamepad" />
              Controle direto
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <font-awesome-icon icon="broadcast-tower" :class="antennaReady ? 'isReady' : 'isNotReady'" />
              Antena
              <font-awesome-icon icon="spinner" class="it-is-spinning" v-if="loadingAntenna" />
            </a>

            <div class="antenna-actions dropdown-menu">
              <a class="dropdown-item" @click="activeAntenna">
                Ligar
              </a>
              <a class="dropdown-item" @click="deactiveAntenna">
                Desligar
              </a>
            </div>
          </li>
        </ul>
      </nav>

      <div class="col col-2">
        <router-link to="/config" active-class="active" class="btn btn-outline-primary">
          <font-awesome-icon icon="cog" />
        </router-link>
      </div>
    </div><!-- /row -->

    <hr />

    <router-view />
  </div>
</template>

<script>
import axios from "./services/axios-setup";

export default {
  name: "App",
  data() {
    return {
      antennaReady: false,
      loadingAntenna: false
    };
  },

  methods: {
    activeAntenna() {
      this.loadingAntenna = true;

      axios
        .post("/mqtt-dispatch", {
          code: "up",
          topic: "movement/up_down"
        })
        .then(r => {
          console.log(r);
          this.loadingAntenna = false;
          this.antennaReady = true;
        })
        .catch(e => {
          console.log(e);
          this.loadingAntenna = false;
          this.antennaReady = false;
        });
    },

    deactiveAntenna() {
      this.loadingAntenna = true;

      axios
        .post("/mqtt-dispatch", {
          code: "down",
          topic: "movement/up_down"
        })
        .then(r => {
          console.log(r);
          this.loadingAntenna = false;
          this.antennaReady = true;
        })
        .catch(e => {
          console.log(e);
          this.loadingAntenna = false;
          this.antennaReady = false;
        });
    }
  }
};
</script>


<style>
.gear-img {
  width: 40px;
}

#main-container {
  margin-top: 10px;
}
.isReady {
  color: rgb(40, 167, 69);
}

.isNotReady {
  color: rgb(220, 53, 69);
}

.it-is-spinning {
  margin-left: 10px;
  color: rgb(255, 193, 7);
  animation: full-roll 2s infinite linear;
  animation-direction: normal;
}

.antenna-actions a {
  cursor: pointer;
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
