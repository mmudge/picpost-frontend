<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="title" label="Post Title" required></v-text-field>
            <!-- need to add image uploader -->
            <p>Picture :</p>
            <!-- <input type="file" ref="inputFile" @change="uploadFile()" /> -->
            <v-file-input v-model="photo"></v-file-input>
            <v-btn color="info" @click="uploadPhoto">upload</v-btn>

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
      user_id: null,
      inputPicture: null,
      photo: null
    };
  },
  methods: {
    // uploadFile() {
    //   this.inputPicture = this.$refs.inputFile.files[0];
    // },
    createPost() {
      const newPost = {
        title: this.title,
        user_id: store.state.user.id
        // photo: this.inputPicture
        // photo: this.photo
      };
      Api.createPost(newPost).then(result => {
        if (result.error) {
          store.commit("setSnackbar", {
            text: "Post failed!",
            color: "error"
          });
        } else {
          this.$emit("getPosts");
          store.commit("setSnackbar", {
            text: "Post created!",
            color: "success"
          });

          this.$emit("dialogToggle");
          this.reset();
        }
      });
    },
    uploadPhoto() {
      Api.directUpload(this.photo).then(result => {
        if (result.error) {
          console.log("got error in photo upload", result.error);
        } else {
          console.log("i think photo upload worked", result);
        }
      });
    },
    reset() {
      this.title = "";
    }
  }
};
</script>

<style></style>
