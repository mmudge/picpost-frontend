<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="subject" label="Subject" required></v-text-field>

            <v-text-field v-model="body" label="Message Body" required></v-text-field>

            <!-- <v-select v-model="user_id" :items="users" label="User"></v-select> -->

            <v-btn color="success" @click="createMessage">add message</v-btn>

            <v-btn color="error" @click="reset">Reset Form</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "NewMessage",
  props: ["users"],
  data() {
    return {
      subject: "",
      body: "",
      user_id: null
    };
  },
  methods: {
    createMessage() {
      const newMessage = {
        subject: this.subject,
        body: this.body,
        user_id: this.$store.state.user.id
      };
      this.$emit("add-message", newMessage);
      this.$emit("closeDialog", false);
      this.reset();
    },
    reset() {
      this.subject = "";
      this.body = "";
      this.user_id = null;
    }
  }
};
</script>

<style>
</style>
