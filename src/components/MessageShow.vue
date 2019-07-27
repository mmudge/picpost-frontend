<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-card offset-sm-3 sm6>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Message show</v-toolbar-title>
            <v-spacer></v-spacer>
            {{ message.created_at }}
          </v-toolbar>
          <v-card-text>{{ message.subject }}</v-card-text>
          <v-card-text class="body-text">{{ message.body }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "MessageShow",
  props: ["messageId"],
  data() {
    return {
      message: {}
    };
  },
  methods: {
    // getMessage() {
    //   console.log(this.messageId);
    //   fetch(
    //     `http://localhost:3000/users/${this.$store.state.user.id}/messages/${
    //       this.messageId
    //     }`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         Authorization: `Bearer ${this.$store.state.user.token}`
    //       }
    //     }
    //   )
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(response => {
    //       return (this.message = response);
    //     })
    //     .catch(error => {
    //       console.log("load message didnt work", error);
    //     });
    // }
  },
  mounted() {
    // this.getMessage();
  }
};
</script>

<style scoped>
.body-text {
  padding: 50px;
}
</style>
