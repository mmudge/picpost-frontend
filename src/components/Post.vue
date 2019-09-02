<template>
  <v-card class="ma-1">
    <v-img :src="image_src" aspect-ratio="1.2"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 v-if="post.title" class="headline mb-0">{{ post.title }}</h3>
        <h3 v-else class="headline mb-0">no title</h3>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn @click.stop="likePost()" text color="blue">
        <v-icon>thumb_up</v-icon>
        <template v-if="post.like">({{ post.like }})</template>
        <template v-else>(0)</template>
      </v-btn>
      <v-btn @click.stop="dislikePost()" text color="red">
        <v-icon>thumb_down</v-icon>
        <template v-if="post.dislike">({{ post.dislike }})</template>
        <template v-else>(0)</template>
      </v-btn>
      <v-btn v-if="checkUser()" text color="red" @click.stop="deletePost()">
        <v-icon>delete</v-icon>
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
    },
    dislikePost() {
      let updatedPost = { id: this.post.id, dislike: 1 };
      Api.updatePost(updatedPost).then(() => {
        Api.getPost(this.post.id).then(response => {
          this.post.dislike = response.dislike;
        });
      });
    },
    checkUser() {
      if (this.post.user.id === this.$store.state.user.id) {
        return true;
      } else {
        return false;
      }
    },
    deletePost() {
      if (this.checkUser()) {
        Api.deletePost(this.post.id).then(response => {
          if (response.error) {
            store.commit("setSnackbar", {
              text: "Deleting post failed!",
              color: "error"
            });
          } else {
            store.commit("setSnackbar", {
              text: "Post deleted!",
              color: "success"
            });
            this.$emit("getPosts");
          }
        });
      }
    }
  },
  computed: {
    setPost() {
      return this.post;
    }
  },
  mounted() {
    this.loadComments(this.post.id);
  }
};
</script>

<style></style>
