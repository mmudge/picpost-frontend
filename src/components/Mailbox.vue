<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Mailbox</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mail</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list three-line>
            <template>
              <v-subheader>Messages</v-subheader>

              <v-divider></v-divider>

              <v-list-tile v-for="message in messages" :key="message.subject">
                <v-list-tile-content>
                  <v-list-tile-title>{{ message.subject }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ message.body }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <label for="user-select">Choose a user to send a message:</label>
    <select id="user-select">
      <option value>--Select--</option>
      <template v-for="u in users">
        <option :key="u.email" value="`${u.id}`">{{ u.email }}</option>
      </template>
    </select>
  </v-container>
</template>

<script>
export default {
  name: "Mailbox",
  data() {
    return {
      messages: [],
      users: []
    };
  },
  methods: {},
  mounted() {
    console.log("store", this.$store.state.user);
    fetch(`http://localhost:3000/users/${this.$store.state.user.id}/messages`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.$store.state.user.token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        return (this.messages = response);
      })
      .catch(error => {
        console.log("load message didnt work", error);
      });
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
};
</script>

<style>
</style>
