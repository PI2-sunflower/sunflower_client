import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// ts-check
export default new Vuex.Store({
  strict: true,

  state: {
    currentNord: "26620", // SAC C

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
    },

    armData: {
      operation: "a",
      error_angle_1: 0,
      error_angle_2: 0,
      error_angle_3: 0,
      magnetometer: 0,
      engine_speed: 0,
      error: false
    }
  },

  mutations: {
    setCurrentNord(state, newNord) {
      state.currentNord = newNord;
    },

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
    },

    setArmData(state, data) {
      state.armData = { ...data, error: false };
    },

    setArmDataError(state, error) {
      state.armData.error = error;
    }
  },

  actions: {
    setCurrentNord(context, newNord) {
      context.commit("setCurrentNord", newNord);
    },

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
    },

    setArmData(context, data) {
      context.commit("setArmData", data);
    },

    setArmDataError(context, error) {
      context.commit("setArmDataError", !!error);
    }
  }
});
