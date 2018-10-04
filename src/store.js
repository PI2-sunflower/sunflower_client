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
    }
  },

  mutations: {
    setTrackData(state, track) {
      state.track = track;
    }
  },

  actions: {
    setTrackData(context, track) {
      context.commit("setTrackData", track);
    }
  }
});
