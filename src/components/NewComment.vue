<template>
  <v-container>
    <v-card>
      <v-card-text>New Comment</v-card-text>
      <v-text-field v-model="remark"></v-text-field>
      <v-btn @click="createComment">make a comment</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import Api from "../api.js";

export default {
  name: "NewComment",
  props: ["post"],
  data() {
    return {
      remark: ""
    };
  },
  methods: {
    createComment() {
      let comment = {
        remark: this.remark,
        user_id: 17
      };
      Api.createComment(this.post.id, comment).then(response => {
        this.$emit("addComment", response);
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
