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
        <Post :post="post" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NewPost from "./NewPost.vue";
import Post from "./Post.vue";
import Api from "../api.js";
import store from "@/store.js";

export default {
  name: "Posts",
  components: {
    NewPost,
    Post
  },
  data() {
    return {
      posts: [],
      dialogNewPost: false,
      image_src: require("../assets/card-bg.png")
    };
  },
  methods: {
    getPosts() {
      Api.getPosts().then(response => {
        this.posts = response;
      });
    },
    dialogToggle() {
      this.dialogNewPost = !this.dialogNewPost;
    }
  },
  mounted() {
    this.getPosts();
  }
};
</script>

<style></style>
