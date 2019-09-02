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

          <v-layout class="my-3">
            <v-btn color="info" dark to="/messages">Mailbox</v-btn>
            <v-btn color="success" dark @click="addMessageDialog = !addMessageDialog">Send a message</v-btn>
          </v-layout>

          <v-layout class="my-3">
            <v-btn color="info" dark to="/posts">Posts</v-btn>
            <v-btn color="success" dark @click="addPostDialog = !addPostDialog">Create a post</v-btn>
          </v-layout>

          <v-dialog v-model="addPostDialog" width="500">
            <NewPost v-on:getPosts="getPosts" v-on:dialogToggle="dialogToggle" />
          </v-dialog>

          <v-dialog v-model="addMessageDialog" width="500">
            <NewMessage v-on:dialogToggle="dialogToggle" />
          </v-dialog>

          <h2>Things I want to add (TODOs):</h2>
          <ul>
            <li>high priority- deployment</li>
            <li>integrate active storage uploads from front end (somehow?) :\</li>
            <li>maybe with axios config</li>
            <li>messages side nav bar</li>
            <li>edit user info</li>
            <li>profile page</li>
            <li>full crud for posts and messages</li>
            <li>home page/ landing page design</li>
            <li>rspec back end test suite</li>
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
import NewPost from "../components/NewPost.vue";
import NewMessage from "../components/NewMessage.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      addPostDialog: false,
      addMessageDialog: false
    };
  },
  components: {
    Mailbox,
    NewPost,
    NewMessage
  },
  computed: {
    getUser() {
      if (this.$store.state.user) {
        return this.$store.state.user;
      }
    }
  },
  methods: {
    dialogToggle() {
      this.addPostDialog = false;
      this.addMessageDialog = false;
    }
  }
};
</script>

<style scoped lang="scss">
#dashboard {
  height: 70vh;
}
</style>
