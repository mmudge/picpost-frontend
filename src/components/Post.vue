<template>
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
    <NewComment :post="post" @addComment="loadComments(post.id)" />
    <v-container v-if="comments">
      <v-list v-for="comment in comments" :key="comment.remark">
        <v-list-tile>
          <v-list-tile-content>{{ comment.remark }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
import NewComment from "./NewComment.vue";
import Api from "../api.js";
import store from "@/store.js";

export default {
  name: "Post",
  components: {
    NewComment
  },
  props: ["post"],
  data() {
    return {
      users: [],
      comments: [],
      image_src: require("../assets/card-bg.png")
    };
  },
  methods: {
    loadUsers() {
      Api.getUsers().then(response => {
        this.users = response;
      });
    },
    loadComments(postId) {
      Api.getComments(postId).then(response => {
        this.comments = response;
      });
    },

    findPostUser(id) {
      return this.users.filter(u => u.id === id)[0].username;
    }
  },
  mounted() {
    this.loadUsers();
    this.loadComments(this.post.id);
  }
};
</script>

<style></style>
