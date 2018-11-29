<template>
  <div class="config-page">
    <div class="row">
      <div class="col col-12">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              :class="'nav-link ' + (currentTab === 'position' ? 'active' : '')"
              @click="setTab('position')"
            >Posição do braço</a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              :class="'nav-link ' + (currentTab === 'params' ? 'active' : '')"
              @click="setTab('params')"
            >Parâmetros</a>
          </li>
        </ul>
      </div>

      <div
        class="col col-12"
        v-if="currentTab === 'position'"
      >
        <PositionConfig />
      </div>

      <div
        class="col col-12"
        v-if="currentTab === 'params'"
      >
        <GeneralConfig />
      </div>
    </div>
  </div>
</template>

<script>
import PositionConfig from "../components/PositionConfig";
import GeneralConfig from "../components/GeneralConfig";

export default {
  name: "Config",

  components: {
    PositionConfig,
    GeneralConfig
  },

  data() {
    return {
      currentTab: "position"
    };
  },

  methods: {
    setTab(newTab) {
      this.currentTab = newTab;
    }
  }
};
</script>

<style scoped>
.left-side {
  border-right: 1px #ccc solid;
}

.nav-item a {
  cursor: pointer;
}

.nav-item a.active {
  color: #007bff !important;
}
</style>
