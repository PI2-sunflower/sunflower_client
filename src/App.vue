<template>
  <div id="main-container" class="container">
    <div class="row">
      <nav class="col col-10">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <span class="navbar-brand disabled">
              Modo
            </span>
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

          <li class="nav-item">
            <a class="nav-link">
              <font-awesome-icon icon="broadcast-tower" :class="arm.ready ? 'isReady' : 'isNotReady'" />
              Antena
              <font-awesome-icon icon="spinner" class="it-is-spinning" v-if="arm.loading" />
            </a>
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
import { mapState } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapState(["arm"])
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
