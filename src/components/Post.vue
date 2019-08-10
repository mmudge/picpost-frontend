<template>
  <v-card class="ma-1">
    <v-img :src="image_src" aspect-ratio="1.2"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ post.title }}</h3>
        <div>user id {{ post.user.username }}</div>
      </div>
    </v-card-title>

    <!-- <v-card-actions>
      <v-btn text color="orange">Share with friends</v-btn>
      <v-btn text color="yellow">Star</v-btn>
    </v-card-actions>-->
    <NewComment :post="post" @addComment="loadComments(post.id)" />
    <Comments :comments="post.comments" />
  </v-card>
</template>

<script>
import NewComment from "./NewComment.vue";
import Comments from "./Comments.vue";
import Api from "../api.js";
import store from "@/store.js";

export default {
  name: "Post",
  components: {
    NewComment,
    Comments
  },
  props: ["post"],
  data() {
    return {
      image_src: require("../assets/card-bg.png")
    };
  },
  methods: {
    loadComments(postId) {
      let post_comments = [];
      Api.getComments(postId).then(response => {
        this.post.comments = response;
      });
    }
  },
  mounted() {
    this.loadComments(this.post.id);
  }
};
</script>

<style></style>
