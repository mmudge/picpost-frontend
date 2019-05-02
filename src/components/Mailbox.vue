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
    <NewMessage v-on:add-message="addMessage" :users="users"/>
  </v-container>
</template>

<script>
import NewMessage from "../components/NewMessage.vue";
export default {
  name: "Mailbox",
  components: {
    NewMessage
  },
  data() {
    return {
      messages: [],
      users: []
    };
  },
  methods: {
    addMessage(newMessage) {
      console.log(JSON.stringify(newMessage));
      const m = {
        message: {
          subject: newMessage.subject,
          body: newMessage.body,
          user_id: this.$store.state.user.id
        }
      };

      return fetch(
        `http://localhost:3000/users/${this.$store.state.user.id}/messages`,
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.user.token}`
          },
          body: JSON.stringify(m)
        }
      )
        .then(response => {
          return response.json();
        })
        .then(response => {
          return console.log(response);

          // this.messages.push(response);
        })
        .catch(error => {
          console.log("post message didnt work", error);
        });
    },
    checkMessages() {
      fetch(
        `http://localhost:3000/users/${this.$store.state.user.id}/messages`,
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
          return (this.messages = response);
        })
        .catch(error => {
          console.log("load message didnt work", error);
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
    }
  },
  mounted() {
    this.checkMessages();
    this.loadUsers();
  }
};
</script>

<style>
</style>
