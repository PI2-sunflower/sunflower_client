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
    }
  },

  mutations: {
    setTrackData(state, track) {
      state.track = track;
    },

    addControlCommand(state, { angle, axis }) {
      state.control.history.push({ angle, axis });
    }
  },

  actions: {
    setTrackData(context, track) {
      context.commit("setTrackData", track);
    },

    addControlCommand(context, { angle, axis }) {
      context.commit("addControlCommand", { angle, axis });
    }
  }
});
