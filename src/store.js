import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'Pic Post',
    user: null,
    isAuthenticated: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    }
  },
  actions: {
    userJoin({ commit }, { email, password, password_confirmation }) {
      return fetch("http://localhost:3000/signup", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // credentials: 'include',
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "JWT"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        // redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        body: JSON.stringify( {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        })
      })
        .then((response) => {
          response.json();
          // console.log(response)
        });
    },
    userLogin({ commit }, { email, password }) {
      const u = { user: { email: email, password: password }}
      return fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "JWT"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(u)
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {

        console.log(response);
        if (response.token) {
          commit('setUser', { user: { email: response.email, token: response.token }});
          commit('setIsAuthenticated', true);
          router.push("dashboard");
        }
      })
      .catch((error) => {
        console.log('login didnt work', error)
      })
    }
  }
});

