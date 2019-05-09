<template>
  <div>
    <h1>Welcome to your profile dashboard {{ getUser.email }}</h1>
    <h2>... or do you prefered to be called {{ getUser.username }} ??</h2>

    <v-btn color="success" dark to="/messages">Check your mailbox</v-btn>
    <v-btn color="warning" dark to="/posts">check yo posts</v-btn>
  </div>
</template>

<script>
import Mailbox from "../components/Mailbox.vue";

export default {
  name: "Dashboard",
  components: {
    Mailbox
  },
  computed: {
    getUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>

<style>
</style>
