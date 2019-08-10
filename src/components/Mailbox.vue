<template>
  <v-container>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Mailbox</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white" dark outlined depressed @click="received = true">
        Received
        <v-icon>mail</v-icon>
      </v-btn>
      <v-btn color="white" dark outlined @click="received = false">
        Sent
        <v-icon>mail</v-icon>
      </v-btn>

      <v-dialog v-model="dialogNewMessage" width="500" pa-5>
        <template v-slot:activator="{ on }">
          <v-btn color="white" dark outlined v-on="on">
            Send a message
            <v-icon>mail</v-icon>
          </v-btn>
        </template>
        <v-card>
          <NewMessage v-on:dialogToggle="dialogToggle" />
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-list two-line subheader v-if="received">
      <v-subheader inset>Inbox</v-subheader>

      <v-list-item
        v-for="message in receivedMessages"
        :key="message.id"
        @click="$router.push({name: 'message', params: { id: message.id }})"
        style="cursor: pointer;"
      >
        <v-list-item-avatar>
          <v-icon>person</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="message.subject"></v-list-item-title>
          <v-list-item-subtitle v-text="message.created_at"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="deleteMessage(message.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-list two-line subheader v-else>
      <v-subheader inset>Sent</v-subheader>

      <v-list-item
        v-for="message in sentMessages"
        :key="message.id"
        @click="$router.push({name: 'message', params: { id: message.id }})"
        style="cursor: pointer;"
      >
        <v-list-item-avatar>
          <v-icon>person</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="message.subject"></v-list-item-title>
          <v-list-item-subtitle v-text="message.created_at"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="deleteMessage(message.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>



<script>
import NewMessage from "../components/NewMessage.vue";
import Api from "../api.js";

export default {
  name: "Mailbox",
  components: {
    NewMessage
  },
  data() {
    return {
      receivedMessages: [],
      sentMessages: [],
      users: [],
      dialogNewMessage: false,
      dialogMessageShow: false,
      received: true
    };
  },
  methods: {
    dialogToggle() {
      this.dialogNewMessage = !this.dialogNewMessage;
    },
    deleteMessage(messageId) {
      Api.deleteMessage(messageId).then(() => {
        this.$store.commit("setSnackbar", {
          text: "Message deleted!",
          color: "error"
        });
        this.checkAllMessages();
      });
    },
    getReceivedMessages() {
      return Api.getReceivedMessages().then(response => {
        this.receivedMessages = response;
      });
    },
    getSentMessages() {
      return Api.getSentMessages().then(response => {
        this.sentMessages = response;
      });
    },
    checkAllMessages() {
      this.getReceivedMessages();
      this.getSentMessages();
    }
  },
  mounted() {
    this.checkAllMessages();
  }
};
</script>

<style></style>
