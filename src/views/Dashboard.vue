<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <h3>
            Welcome to your profile dashboard
            <strong>{{ getUser.username }}</strong>
          </h3>

          <v-btn color="success" dark to="/messages">Check your mailbox</v-btn>
          <v-btn color="warning" dark to="/posts">check yo posts</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Mailbox from "../components/Mailbox.vue";
import Api from "../api.js";

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

<style></style>
