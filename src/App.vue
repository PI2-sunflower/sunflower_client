<template>
  <div>
    <div
      v-if="screenLocked === true"
      class="my-card-wrapper"
    >
      <UnlockCard :unlockScreen="unlockScreen" />
    </div>

    <div
      id="main-container"
      class="container"
      v-if="screenLocked === false"
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
                Braço: {{armStatusText}}
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
  </div>
</template>

<script>
import { mapState } from "vuex";

import axios from "./services/axios-setup";
import fetchPosition from "./services/fetch-position";

import UnlockCard from "./components/UnlockCard";

export default {
  name: "App",

  components: {
    UnlockCard
  },

  data() {
    return {
      keepChecking: true,
      screenLocked: true
    };
  },

  computed: {
    ...mapState(["arm", "positions"]),

    armStatusText() {
      switch (this.arm.status) {
        case "dead":
          return "sem resposta";
        case "alive":
          return "ocioso";
        case "busy":
          return "ocupado";

        default:
          return `status desconhecido: {this.arm.status}`;
      }
    }
  },

  mounted() {
    this.checkArmStatus();
    this.getArmPosition();
    this.getArmData();
  },

  methods: {
    unlockScreen() {
      this.screenLocked = false;
    },

    async getArmPosition() {
      let { error, data } = await fetchPosition();

      if (error.length === 0) {
        this.updateLocalState(data);
      } else {
        this.$store.dispatch("setPositionsError", true);
      }
    },

    async getArmData() {
      try {
        let { data } = await axios.get("/get-arm-data");
        this.$store.dispatch("setArmData", data);
      } catch (e) {
        this.$store.dispatch("setArmDataError", true);
        console.log(e);
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
.my-card-wrapper {
  position: absolute;
  display: flex;
  background-color: #d4d4d4;
  height: 99vh;
  width: 100%;
  justify-content: center;
  align-items: center;
}

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

.antenna-actions a {
  cursor: pointer;
}

.position-error {
  color: #dc3545;
}
</style>
