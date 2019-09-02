<template>
  <div>
    <v-card>
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
    </v-card>
  </div>
</template>

<!-- <template>
  <v-card>
    <v-toolbar
      text
      color="pink"
      dark
    >
      <v-icon>arrow_back</v-icon>
      <v-toolbar-title>Compose</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>send</v-icon>
    </v-toolbar>
    <v-form>
      <v-autocomplete
        v-model="selected"
        :items="['Trevor Handsen', 'Alex Nelson']"
        chips
        label="To"
        full-width
        hide-details
        hide-no-data
        hide-selected
        multiple
        single-line
      ></v-autocomplete>
      <v-divider></v-divider>
      <v-text-field
        label="Subject"
        value="Plans for the weekend"
        single-line
        full-width
        hide-details
      ></v-text-field>
      <v-divider></v-divider>
      <v-textarea
        v-model="title"
        label="Message"
        counter
        maxlength="120"
        full-width
        single-line
      ></v-textarea>
    </v-form>
  </v-card>
</template> -->

<script>
import Api from "../api.js";
import store from "@/store.js";

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

      Api.addMessage(messageInfo).then(() => {
        store.commit("setSnackbar", {
          text: "Message sent!",
          color: "success"
        });
      });
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
