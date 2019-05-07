<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Join Us!</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="person"
                name="username"
                label="Username"
                type="username"
                v-model="username"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                required
                v-model="password"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password_confirmation"
                label="Password Confirmation"
                id="password_confirmation"
                type="password_confirmation"
                required
                v-model="password_confirmation"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit">Join</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Join",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      username: ""
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("userJoin", {
        email: this.email,
        username: this.username,
        password: this.password,
        password_confirmation: this.password_confirmation
      });
    }
  }
};
</script>

<style></style>
