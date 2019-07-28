<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-card offset-sm-3 sm6>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ message.subject }}</v-toolbar-title>
            <v-spacer></v-spacer>
            {{ message.created_at }}
          </v-toolbar>
          <v-card-text class="body-text">{{ message.body }}</v-card-text>
          <v-card-text class="body-text">Sent from: {{ sender.username }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Api from "../api.js";

export default {
  name: "Message",
  props: ["id"],
  data() {
    return {
      message: {},
      sender: {}
    };
  },
  methods: {},
  mounted() {
    Api.getMessage(this.id)
      .then(response => {
        this.message = response;
        return response;
      })
      .then(response => {
        Api.getUser(response.sender_id).then(response => {
          this.sender = response;
        });
      });
  }
};
</script>

<style scoped>
.body-text {
  padding: 50px;
  font-size: 18px;
}
</style>
