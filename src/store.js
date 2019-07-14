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
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setMessages(state, payload) {
      state.messages.push(payload);
    }
  },
  actions: {
    loadMessages({ commit }) {},
    userJoin({ commit }, { email, username, password, password_confirmation }) {
      return fetch("http://localhost:3000/signup", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "JWT"
        },
        body: JSON.stringify({
          user: {
            email: email,
            username: username,
            password: password,
            password_confirmation: password_confirmation
          }
        })
      })
        .then(response => {
          response.json();
          router.push("/login");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    userLogin({ commit }, { email, password }) {
      const u = { user: { email: email, password: password } };
      return fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "JWT"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(u)
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          console.log(response.username);
          if (response.token) {
            const token = response.token
            localStorage.setItem('token', token);
            console.log(localStorage)
            commit("setUser", response);
            commit("setIsAuthenticated", true);
            console.log("(store)current user is", response);
            router.push("/dashboard");
          }
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    userSignOut({ commit }) {
      return fetch("http://localhost:3000/logout", {
        method: "DELETE",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "JWT"
        },
        body: JSON.stringify(this.state.user)
      }).then(response => {
        commit("setUser", null);
        commit("setIsAuthenticated", false);
        localStorage.token = '';
        router.push("/");
      });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    },
    currentUser(state) {
      return state.user;
    }
  }
});
