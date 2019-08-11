<template>
  <v-card class="ma-1">
    <v-img :src="image_src" aspect-ratio="1.2"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ post.title }}</h3>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn @click="likePost()" text color="blue">
        <v-icon>thumb_up</v-icon>
        <template v-if="post.like">({{post.like }})</template>
        <template v-else>(0)</template>
      </v-btn>
      <v-btn text color="red">
        <v-icon>thumb_down</v-icon>
      </v-btn>
      <!-- <v-btn text color="yellow">Star</v-btn> -->
    </v-card-actions>
    <template v-if="fullPost">
      <div>Posted by: {{ post.user.username }}</div>
      <NewComment :post="post" @addComment="loadComments(post.id)" />
      <Comments :comments="post.comments" />
    </template>
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
  props: ["post", "fullPost"],
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
    },
    likePost() {
      let updatedPost = { id: this.post.id, like: 1 };
      Api.updatePost(updatedPost).then(() => {
        Api.getPost(this.post.id).then(response => {
          this.post.like = response.like;
        });
      });
    }
  },
  computed: {
    setPost() {
      return this.post;
    }
  },
  mounted() {
    console.log(this.post);
    this.loadComments(this.post.id);
  }
};
</script>

<style></style>
