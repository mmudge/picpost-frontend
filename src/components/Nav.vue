<template>
  <div>
    <v-navigation-drawer app v-model="drawer" class="blue darken-2" dark disable-resize-watcher>
      <v-list>
        <v-list-tile v-for="item in sideBar" :key="item.index" :to="item.link">
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/login" v-if="!isAuthenticated">
          <v-list-tile-content>Login</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/join" v-if="!isAuthenticated">
          <v-list-tile-content>Join</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout()" v-if="isAuthenticated">
          <v-list-tile-content>Sign out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="primary" dark>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-btn flat dark to="/">
        <v-toolbar-title>
          {{ appName }}
          <v-icon>chat_bubble_outline</v-icon>
        </v-toolbar-title>
      </v-btn>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-toolbar-items v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/posts">Posts</v-btn>
        <v-btn to="/login" flat>Login</v-btn>
        <v-btn to="/join" flat>Sign Up</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-sm-and-down">
        <v-btn flat to="/posts">Posts</v-btn>
        <v-btn flat to="/dashboard">Dashboard</v-btn>
        <v-btn flat to="/messages">Messages</v-btn>
        <v-btn flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import Api from "../api.js";
export default {
  name: "Nav",
  data() {
    return {
      drawer: false,
      sideBar: [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Messages", link: "/messages" },
        { title: "Posts", link: "/posts" }
      ]
    };
  },
  computed: {
    appName() {
      return this.$store.state.appName;
    },
    isAuthenticated() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    logout() {
      // this.$store.dispatch("userSignOut");
      Api.userSignOut().then(() => {
        this.$router.push("/");
      });
    },
    checkLogout(title) {
      if (title == "logout") {
        this.logout();
      }
    }
  }
};
</script>

<style></style>
