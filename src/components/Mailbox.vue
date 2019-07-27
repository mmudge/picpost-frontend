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
                  Send a message
                  <v-icon>mail</v-icon>
                </v-btn>
              </template>
              <v-card>
                <NewMessage v-on:dialogToggle="dialogToggle" />
              </v-card>
            </v-dialog>
          </v-toolbar>
          <h2>Received Messages</h2>
          <v-list three-line v-for="message in receivedMessages" :key="message.id">
            <!-- <v-dialog v-model="dialogMessageShow" width="500" pa-5>
               <template v-slot:activator="{ on }">
                <v-btn color="success" dark v-on="on">view message</v-btn>
              </template>
              <v-card>
                <MessageShow :messageId="message.id" />
              </v-card>
            </v-dialog>-->
            <v-list-tile>
              <v-list-tile-content
                style="cursor: pointer;"
                @click="dialogMessageShow = !dialogMessageShow"
              >
                <v-list-tile-title>
                  <strong>{{ message.subject }}</strong>
                </v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">
                  {{
                  message.created_at
                  }}
                </v-list-tile-sub-title>

                <v-list-tile-sub-title>
                  {{
                  message.body
                  }}
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-spacer></v-spacer>

              <v-btn icon @click="deleteMessage(message.id)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile>
          </v-list>

          <h2>Sent Messages</h2>
          <v-list three-line v-for="message in sentMessages" :key="message.id">
            <!-- <v-dialog v-model="dialogMessageShow" width="500" pa-5>
               <template v-slot:activator="{ on }">
                <v-btn color="success" dark v-on="on">view message</v-btn>
              </template>
              <v-card>
                <MessageShow :messageId="message.id" />
              </v-card>
            </v-dialog>-->
            <v-list-tile>
              <v-list-tile-content
                style="cursor: pointer;"
                @click="dialogMessageShow = !dialogMessageShow"
              >
                <v-list-tile-title>
                  <strong>{{ message.subject }}</strong>
                </v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">
                  {{
                  message.created_at
                  }}
                </v-list-tile-sub-title>

                <v-list-tile-sub-title>
                  {{
                  message.body
                  }}
                </v-list-tile-sub-title>
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
import Api from "../api.js";

export default {
  name: "Mailbox",
  components: {
    NewMessage,
    MessageShow
  },
  data() {
    return {
      receivedMessages: [],
      sentMessages: [],
      users: [],
      dialogNewMessage: false,
      dialogMessageShow: false
    };
  },
  methods: {
    dialogToggle() {
      this.dialogNewMessage = !this.dialogNewMessage;
    }

    // checkMessages() {
    //   fetch(
    //     `http://localhost:3000/users/${this.$store.state.user.id}/messages`,
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
    //       return (this.messages = response);
    //     })
    //     .catch(error => {
    //       console.log("load message didnt work", error);
    //     });
    // },
    // deleteMessage(messageId) {
    //   fetch(
    //     `http://localhost:3000/users/${this.$store.state.user.id}/messages/${messageId}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${this.$store.state.user.token}`
    //       }
    //       // body: JSON.stringify({ id: messageId })
    //     }
    //   ).then(this.checkMessages());
    // },
    // loadUsers() {
    //   fetch(`http://localhost:3000/users`, {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json"
    //     }
    //   })
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(response => {
    //       return (this.users = response);
    //     })
    //     .catch(error => {
    //       console.log("load users didnt work", error);
    //     });
    // }
  },
  mounted() {
    // this.checkMessages();
    Api.getReceivedMessages().then(response => {
      console.log("received messages", response);
      this.receivedMessages = response;
    });

    Api.getSentMessages().then(response => {
      console.log("sent messages", response);
      this.sentMessages = response;
    });
  }
};
</script>

<style></style>
