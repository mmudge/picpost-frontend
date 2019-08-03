<template>
  <v-container>
    <v-layout>
      <v-text-field v-model="remark"></v-text-field>
      <v-btn icon @click="createComment">
        <v-icon color="blue">chat_bubble_outline</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import Api from "../api.js";

export default {
  name: "NewComment",
  props: ["post"],
  data() {
    return {
      remark: null
    };
  },
  methods: {
    createComment() {
      let comment = {
        remark: this.remark,
        user_id: 17
      };
      Api.createComment(this.post.id, comment).then(response => {
        this.$store.commit("setSnackbar", {
          text: "Comment added!",
          color: "success"
        });
        this.$emit("addComment");
        this.remark = null;
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
