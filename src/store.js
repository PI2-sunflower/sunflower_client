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
      status: "dead"
    },

    positions: {
      latitude: 0,
      longitude: 0,
      altitude: 0,
      error: false
    }
  },

  mutations: {
    setTrackData(state, track) {
      state.track = track;
    },

    addControlCommand(state, command) {
      state.control.history.push(command);
    },

    setArmStatus(state, status) {
      state.arm.status = status;
    },

    setPositions(state, positions) {
      state.positions = { ...positions, error: false };
    },

    setPositionsError(state, errorState) {
      state.positions.error = errorState;
    }
  },

  actions: {
    setTrackData(context, track) {
      context.commit("setTrackData", track);
    },

    addControlCommand(context, command) {
      context.commit("addControlCommand", command);
    },

    setArmStatus(context, status) {
      context.commit("setArmStatus", status);
    },

    setPositions(context, positions) {
      context.commit("setPositions", positions);
    },

    setPositionsError(context, errorState) {
      context.commit("setPositionsError", !!errorState);
    }
  }
});
