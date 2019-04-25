import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'Pic Post'
  },
  mutations: {},
  actions: {
    userJoin({ commit }, { email, password, password_confirmation }) {
      return fetch("http://localhost:3000/signup", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        // redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        body: JSON.stringify( {
          user: {
            email: 'mikey@gmail.com',
            password: 'abc123',
            password_confirmation: 'abc123'
          }
        })
      })
        .then((response) => {
          response.json()
          console.log(response)
        });


    }
  }
});

