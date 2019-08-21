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
          <h2>Things I want to add (TODOs):</h2>
          <ul>
            <li>high priority- deployment</li>
            <li>dislike posts</li>
            <li>messages side nav bar</li>
            <li>edit user info</li>
            <li>profile page</li>
            <li>full crud for posts and messages</li>
            <li>home page/ landing page design</li>
            <li>rspec back end test suite</li>
            <li>integrate active storage uploads from front end (somehow?) :\</li>
            <li>refactor some components and views because right now they dont make sense, postsIndex and posts, messages and inbox</li>
            <li>overall design re do</li>
            <li>interate vuetify 2</li>
          </ul>
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
