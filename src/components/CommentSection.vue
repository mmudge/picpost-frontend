<template>
  <v-container>
    <v-card>
      <v-card-text>comment section</v-card-text>
      <v-btn @click="createComment">make a comment</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import Api from "../api.js";

export default {
  name: "CommentSection",
  data() {
    return {};
  },
  methods: {
    createComment() {
      let comment = {
        remark: "hey super cool comment dude",
        user_id: 17,
        post_id: 1
      };
      Api.createComment(comment);
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
