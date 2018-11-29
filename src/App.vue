<template>
  <div
    id="main-container"
    class="container"
  >
    <div class="row">
      <nav class="col col-10">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <span class="navbar-brand disabled">
              Modo
            </span>
          </li>

          <li class="nav-item">
            <router-link
              active-class="active"
              to="/tracker"
              class="nav-link"
            >
              <font-awesome-icon icon="globe-americas" />
              Rastreador
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              active-class="active"
              to="/control"
              class="nav-link"
            >
              <font-awesome-icon icon="gamepad" />
              Controle direto
            </router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link">
              <font-awesome-icon
                icon="broadcast-tower"
                :class="'arm-' + arm.status"
              />
              Antena
              &nbsp;
              <span
                class="position-error"
                v-if="positions.error"
              >
                Não pode obter a posição do braço
              </span>
            </a>

          </li>
        </ul>
      </nav>

      <div class="col col-2">
        <router-link
          to="/config"
          active-class="active"
          class="btn btn-outline-primary"
        >
          <font-awesome-icon icon="cog" />
          Configurações
        </router-link>
      </div>
    </div><!-- /row -->

    <hr />

    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

import axios from "./services/axios-setup";
import fetchPosition from "./services/fetch-position";

export default {
  name: "App",

  data() {
    return {
      keepChecking: true
    };
  },

  computed: {
    ...mapState(["arm", "positions"])
  },

  mounted() {
    this.checkArmStatus();
    this.getArmPosition();
  },

  methods: {
    async getArmPosition() {
      let { error, data } = await fetchPosition();

      if (error.length === 0) {
        this.updateLocalState(data);
      } else {
        this.$store.dispatch("setPositionsError", true);
      }
    },

    updateLocalState(data) {
      this.$store.dispatch("setPositions", data);
    },

    async checkArmStatus() {
      try {
        let { data } = await axios.get("/get-arm-status");
        this.$store.dispatch("setArmStatus", data.status);
      } catch (e) {
        console.log("Could not get arm status");
        console.log(e);
      } finally {
        if (this.keepChecking) {
          window.setTimeout(() => {
            this.checkArmStatus();
          }, 2000);
        }
      }
    }
  }
};
</script>


<style scoped>
.arm-dead {
  color: rgb(220, 53, 69);
}

.arm-alive {
  color: rgb(40, 167, 69);
}

.arm-busy {
  color: rgb(255, 193, 7);
}

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

.position-error {
  color: #dc3545;
}
</style>
