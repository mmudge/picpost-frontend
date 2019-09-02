<template>
  <v-container>
    <v-dialog v-model="dialogNewPost" width="500" pa-5>
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on">New Post</v-btn>
      </template>

      <NewPost v-on:getPosts="getPosts" v-on:dialogToggle="dialogToggle" />
    </v-dialog>
    <v-layout row wrap justify-center>
      <v-flex
        xs12
        sm4
        v-for="post in posts"
        :key="post.id"
        @click="fullPostDialog = true; postDetails = post"
      >
        <Post :post="post" v-on:getPosts="getPosts()" />
      </v-flex>
    </v-layout>
    <v-dialog v-model="fullPostDialog" width="1000">
      <Post :post="postDetails" :fullPost="true" v-on:getPosts="getPosts()" />
    </v-dialog>
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
      fullPostDialog: false,
      postDetails: null,
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
