<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-form ref="form" lazy-validation>
            <v-select
              v-model="receiver"
              :items="users"
              :rules="[v => !!v || 'You have to send your message to someone!']"
              label="Who do you want to send a message to?"
              required
              item-text="username"
              return-object
            ></v-select>
            <v-text-field v-model="subject" label="Subject" required></v-text-field>

            <v-text-field v-model="body" label="Message Body" required></v-text-field>

            <v-btn color="success" @click="createMessage">Send Message</v-btn>

            <v-btn color="error" @click="reset">Reset Form</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Api from "../api.js";

export default {
  name: "NewMessage",
  data() {
    return {
      subject: "",
      body: "",
      receiver: null,
      users: []
    };
  },
  methods: {
    createMessage() {
      const messageInfo = {
        subject: this.subject,
        body: this.body,
        receiver_id: this.receiver.id
      };

      Api.addMessage(messageInfo);
      this.$emit("dialogToggle");
      this.reset();
    },
    reset() {
      this.subject = "";
      this.body = "";
      this.receiver = null;
    }
  },
  mounted() {
    Api.getUsers().then(response => {
      this.users = response;
    });
  }
};
</script>

<style></style>
