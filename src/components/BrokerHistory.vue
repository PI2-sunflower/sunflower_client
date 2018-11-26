<template>
  <ul class="list-group list-group-flush broker-history">
    <li class="list-group-item" v-for="(item, i) in history" :key="i">
      <div>{{item.topic}}</div>
      <div>{{item.command}}</div>
    </li>
  </ul>
</template>

<script>
import axios from "../services/axios-setup";

export default {
  name: "BrokerHistory",

  data() {
    return {
      error: "",
      keepPulling: true,
      history: []
    };
  },

  mounted() {
    this.getCommandHistory();
  },

  destroyed() {
    this.keepPulling = false;
  },

  methods: {
    async getCommandHistory() {
      const TIMEOUT = 1500;

      try {
        let { data } = await axios.get("/command-history");
        this.history = data;
      } catch (e) {
        this.error = "Não pode buscar pelo histórico";
        this.history = [];
      } finally {
        if (this.keepPulling === true) {
          window.setTimeout(this.getCommandHistory, TIMEOUT);
        }
      }
    }
  }
};
</script>

<style scoped>
.broker-history {
  max-height: 500px;
  overflow: auto;
}
.broker-history li:nth-child(even) {
  background-color: #dee2e6;
}
</style>
