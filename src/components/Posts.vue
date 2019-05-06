<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title dark>All Posts</v-toolbar-title>
      </v-toolbar>
      <v-dialog v-model="dialogNewPost" width="500" pa-5>
        <template v-slot:activator="{ on }">
          <v-btn color="success" dark v-on="on">New Post</v-btn>
        </template>
        <v-card>
          <NewPost v-on:add-post="addPost" :users="users" v-on:closeDialog="dialogOff"/>
        </v-card>
      </v-dialog>
      <v-layout v-for="post in posts" :key="post.id">
        <v-card>
          <h1>{{ post.title }}</h1>
        </v-card>
      </v-layout>
    </v-container>
  </div>
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
      dialog: false
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
