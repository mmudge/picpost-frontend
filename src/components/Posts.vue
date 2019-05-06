<template>
  <div>
    <h1>this is the posts component</h1>
    <v-container>
      <v-layout v-for="post in posts" :key="post.id">
        <v-card>
          <h1>{{ post.title }}</h1>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Posts",
  data() {
    return {
      posts: []
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
    }
  },
  mounted() {
    this.getPosts();
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
