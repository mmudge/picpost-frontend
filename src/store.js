import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: "Pic Post",
    user: null,
    isAuthenticated: false,
    snackbar: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setSnackbar(state, payload) {
      state.snackbar = payload;
    }
  },
  getters: {
    currentUser(state) {
      return state.user;
    }
  }
});
