<template>
  <div>
    <v-container id="dashboard" class="flex-center">
      <div class="flex-center">
        <v-flex>
          <h1>
            Welcome to your dashboard
            <strong v-if="getUser.username">{{ getUser.username }}</strong>
            <strong v-else>welcome no named person, make a friggen username</strong>
          </h1>

          <v-btn color="success" dark to="/messages">Mailbox</v-btn>
          <v-btn color="warning" dark to="/posts">Posts</v-btn>
        </v-flex>
      </div>
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
      if (this.$store.state.user) {
        return this.$store.state.user;
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
#dashboard {
  height: 70vh;
}
</style>
