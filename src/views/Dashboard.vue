<template>
  <div>
    <h1>Welcome to your profile dashboard {{ getUser.email }}</h1>

    <v-btn color="success" dark to="/messages">Check your mailbox</v-btn>
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
