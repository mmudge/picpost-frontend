<template>
  <v-container>
    <v-dialog v-model="dialogNewPost" width="500" pa-5>
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on">New Post</v-btn>
      </template>
      <v-card>
        <NewPost v-on:getPosts="getPosts" v-on:dialogToggle="dialogToggle" />
      </v-card>
    </v-dialog>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm3 v-for="post in posts" :key="post.id">
        <v-card class="ma-1">
          <v-img :src="image_src" aspect-ratio="1.2"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ post.title }}</h3>
              <div>user id {{ post.user_id }}</div>
              <div>posted by {{ findPostUser(post.user_id) }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share with friends</v-btn>
            <v-btn flat color="yellow">Star</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NewPost from "../components/NewPost.vue";
import Api from "../api.js";
import store from "@/store.js";

export default {
  name: "Posts",
  components: {
    NewPost
  },
  data() {
    return {
      posts: [],
      users: [],
      dialogNewPost: false,
      dialog: false,
      image_src: require("../assets/card-bg.png")
    };
  },
  methods: {
    getPosts() {
      Api.getPosts().then(response => {
        this.posts = response;
      });
    },
    loadUsers() {
      Api.getUsers().then(response => {
        this.users = response;
      });
    },
    dialogToggle() {
      this.dialogNewPost = !this.dialogNewPost;
    },
    findPostUser(id) {
      return this.users.filter(u => u.id === id)[0].username;
    }
  },
  mounted() {
    this.getPosts();
    this.loadUsers();
  }
};
</script>

<style></style>
