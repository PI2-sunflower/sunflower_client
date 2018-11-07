import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// ts-check
export default new Vuex.Store({
  strict: true,

  state: {
    track: {
      from: null,
      to: null,
      positions: [],
      info: null
    },

    control: {
      history: []
    },

    arm: {
      ready: false,
      loading: false
    }
  },

  mutations: {
    setTrackData(state, track) {
      state.track = track;
    },

    addControlCommand(state, command) {
      state.control.history.push(command);
    },

    setArmReady(state, isReady) {
      state.arm.ready = isReady;
    },

    setArmLoading(state, loading) {
      state.arm.loading = !!loading;
    }
  },

  actions: {
    setTrackData(context, track) {
      context.commit("setTrackData", track);
    },

    addControlCommand(context, command) {
      context.commit("addControlCommand", command);
    },

    setArmReady(context, isReady) {
      context.commit("setArmReady", isReady);
    },

    setArmLoading(context, loading) {
      context.commit("setArmLoading", loading);
    }
  }
});
