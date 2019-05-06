<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Mailbox</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogNewMessage" width="500" pa-5>
              <template v-slot:activator="{ on }">
                <v-btn color="success" dark v-on="on">
                  New message
                  <v-icon>mail</v-icon>
                </v-btn>
              </template>
              <v-card>
                <NewMessage
                  v-on:add-message="addMessage"
                  :users="users"
                  v-on:closeDialog="dialogOff"
                />
              </v-card>
            </v-dialog>
          </v-toolbar>

          <v-list three-line v-for="message in messages" :key="message.id">
            <v-dialog v-model="dialogMessageShow" width="500" pa-5>
              <!-- <template v-slot:activator="{ on }">
                <v-btn color="success" dark v-on="on">view message</v-btn>
              </template>-->
              <v-card>
                <MessageShow :messageId="message.id"/>
              </v-card>
            </v-dialog>
            <v-list-tile>
              <v-list-tile-content
                style="cursor: pointer;"
                @click="dialogMessageShow = !dialogMessageShow"
              >
                <v-list-tile-title>
                  <strong>{{ message.subject }}</strong>
                </v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ message.created_at }}</v-list-tile-sub-title>

                <v-list-tile-sub-title>{{ message.body }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-spacer></v-spacer>

              <v-btn icon @click="deleteMessage(message.id)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NewMessage from "../components/NewMessage.vue";
import MessageShow from "../components/MessageShow.vue";

export default {
  name: "Mailbox",
  components: {
    NewMessage,
    MessageShow
  },
  data() {
    return {
      messages: [],
      users: [],
      dialogNewMessage: false,
      dialogMessageShow: false
    };
  },
  methods: {
    dialogOff() {
      this.dialog = false;
    },
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
          console.log(response);
          this.dialogNewMessage = false;
          return this.messages.push(response);
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
    deleteMessage(messageId) {
      fetch(
        `http://localhost:3000/users/${
          this.$store.state.user.id
        }/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.user.token}`
          }
          // body: JSON.stringify({ id: messageId })
        }
      ).then(this.checkMessages());
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
