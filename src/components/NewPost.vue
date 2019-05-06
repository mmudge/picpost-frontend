<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="title" label="Post Title" required></v-text-field>
            <!-- need to add image uploader -->

            <v-btn color="success" @click="createPost">add post</v-btn>

            <v-btn color="error" @click="reset">Reset Form</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
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
        user_id: this.$store.state.user.id
      };
      this.$emit("add-post", newPost);
      this.$emit("closeDialog", false);
      this.reset();
    },
    reset() {
      this.title = "";
    }
  }
};
</script>

<style>
</style>
