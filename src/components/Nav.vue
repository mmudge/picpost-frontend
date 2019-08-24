<template>
  <div>
    <v-navigation-drawer app v-model="drawer" class="blue darken-2" dark disable-resize-watcher>
      <v-list>
        <v-list-item v-for="item in sideBar" :key="item.index" :to="item.link">
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
        <v-list-item to="/login" v-if="!isAuthenticated">
          <v-list-item-content>Login</v-list-item-content>
        </v-list-item>
        <v-list-item to="/join" v-if="!isAuthenticated">
          <v-list-item-content>Join</v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout()" v-if="isAuthenticated">
          <v-list-item-content>Sign out</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer">
        <v-icon>list</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-btn depressed class="blue darken-2" text dark to="/">
        <v-toolbar-title>
          {{ appName }}
          <v-icon>chat_bubble_outline</v-icon>
        </v-toolbar-title>
      </v-btn>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-toolbar-items v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn class="blue darken-2" text to="/posts">Posts</v-btn>
        <v-btn class="blue darken-2" to="/login" text>Login</v-btn>
        <v-btn class="blue darken-2" to="/join" text>Sign Up</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-sm-and-down">
        <v-btn class="blue darken-2" depressed text to="/posts">Posts</v-btn>
        <v-btn class="blue darken-2" depressed text to="/dashboard">Dashboard</v-btn>
        <v-btn class="blue darken-2" depressed text to="/messages">Messages</v-btn>
        <v-btn
          class="blue darken-2"
          depressed
          v-if="userName"
          text
          @click="logout"
        >Logout ({{ userName }})</v-btn>
        <v-btn class="blue darken-2" depressed v-else text @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
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
    },
    userName() {
      return this.$store.getters.currentUser.username;
    }
  },
  methods: {
    logout() {
      // this.$store.dispatch("userSignOut");
      Api.userSignOut().then(result => {
        if (result.error) {
          this.$store.commit("setSnackbar", {
            text: "Log out failed",
            color: "error"
          });
        } else {
          this.$store.commit("setSnackbar", {
            text: `Logged out`,
            color: "success"
          });
          this.$router.push("/");
        }
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
