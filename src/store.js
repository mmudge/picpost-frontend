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
    messages: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setMessages(state, payload) {
      state.messages.push(payload);
    }
  },
  actions: {
    loadMessages({ commit }) {},
  },
  getters: {
    currentUser(state) {
      return state.user;
    }
  }
});
