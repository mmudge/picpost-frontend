<template>
  <div id="homepage" class="flex-center">
    <div v-if="userLoggedIn">
      <h1>Welcome to the homepage, {{ userLoggedIn.email }}</h1>
      <v-btn to="/dashboard" outlined text color="blue">Dashboard</v-btn>
    </div>
    <div v-else>
      <h1>Welcome, please log in</h1>
      <v-btn to="/login" outlined text color="green">Log in</v-btn>
    </div>
  </div>
</template>

<script>
import Api from "../api.js";
import store from "@/store.js";

export default {
  name: "Home",
  computed: {
    userLoggedIn() {
      return store.state.user;
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
#homepage {
  height: 100vh;
}
</style>
