import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import Api from "./api";

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
    },
  },
  actions: {

  },
  getters: {
    currentUser(state) {
      return state.user;
    }
  }
});
