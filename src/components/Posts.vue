<template>
  <v-container fluid>
    <v-dialog v-model="dialogNewPost" width="500" pa-5>
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on">New Post</v-btn>
      </template>
      <v-card>
        <NewPost v-on:add-post="addPost" :users="users" v-on:closeDialog="dialogOff"/>
      </v-card>
    </v-dialog>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm3 ma-1 v-for="post in posts" :key="post.id">
        <v-card>
          <v-img :src="image_src" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ post.title }}</h3>
              <div>user id {{ post.user_id }}</div>
              <div>posted by {{ findPostUser(post.user_id) }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share with friends</v-btn>
            <v-btn flat color="orange">Heart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import NewPost from "../components/NewPost.vue";
export default {
  name: "Posts",
  components: {
    NewPost
  },
  data() {
    return {
      posts: [],
      users: [],
      dialogNewPost: false,
      dialog: false,
      image_src: require("../assets/card-bg.png")
    };
  },
  methods: {
    getPosts() {
      fetch(`http://localhost:3000/posts`, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          return (this.posts = res);
        })
        .catch(err => {
          console.log("get posts didnt work", err);
        });
    },
    addPost(newPost) {
      const post = {
        post: {
          title: newPost.title,
          user_id: this.$store.state.user.id
        }
      };

      fetch(`http://localhost:3000/posts`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.user.token}`
        },
        body: JSON.stringify(post)
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          console.log(response);
          this.dialogNewPost = false;
          return this.posts.push(response);
        });
    },
    loadUsers() {
      fetch(`http://localhost:3000/users`, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          return (this.users = response);
        })
        .catch(error => {
          console.log("load users didnt work", error);
        });
    },
    dialogOff() {
      this.dialog = false;
    },
    findPostUser(id) {
      return this.users.filter(u => u.id === id)[0].username;
    }
  },
  mounted() {
    this.getPosts();
    this.loadUsers();
  }
};
</script>

<style>
</style>




loadUsers() {
      fetch(`http://localhost:3000/users`, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          return (this.users = response);
        })
        .catch(error => {
          console.log("load users didnt work", error);
        });
    }
