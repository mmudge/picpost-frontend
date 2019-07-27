<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="title" label="Post Title" required></v-text-field>
            <!-- need to add image uploader -->

            <v-btn color="success" @click="createPost">Create post</v-btn>

            <v-btn color="error" @click="reset">Reset Form</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Api from "../api.js";
import store from "@/store.js";

export default {
  name: "NewPost",
  data() {
    return {
      title: "",
      user_id: null
    };
  },
  methods: {
    createPost() {
      const newPost = {
        title: this.title,
        user_id: store.state.user.id
      };
      Api.createPost(newPost).then(() => {
        this.$emit("getPosts");
      });
      this.$emit("dialogToggle");
      this.reset();
    },
    reset() {
      this.title = "";
    }
  }
};
</script>

<style></style>
