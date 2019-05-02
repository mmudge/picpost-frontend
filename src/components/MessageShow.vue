<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>this is the message show page id = {{messageId }}</v-card>
        <v-card>
          {{ message.subject }}
          {{ message.body }}
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
    getMessage() {
      console.log(this.messageId);

      fetch(
        `http://localhost:3000/users/${this.$store.state.user.id}/messages/${
          this.messageId
        }`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.$store.state.user.token}`
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(response => {
          return (this.message = response);
        })
        .catch(error => {
          console.log("load message didnt work", error);
        });
    }
  },
  mounted() {
    this.getMessage();
  }
};
</script>

<style>
</style>
