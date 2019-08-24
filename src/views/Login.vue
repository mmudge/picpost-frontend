<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
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
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                required
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Api from "../api.js";

export default {
  name: "Login",
  data() {
    return {
      valid: false,
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        Api.userLogin(this.email, this.password).then(result => {
          console.log("results from user login", result);
          if (result.error) {
            this.$store.commit("setSnackbar", {
              text: "Invalid username / password",
              color: "error"
            });
          } else {
            this.$store.commit("setSnackbar", {
              text: `Logged in ${this.email}`,
              color: "success"
            });
            this.$router.push("/dashboard");
          }
          // this.$router.push("/dashboard");
        });
      }
    }
  }
};
</script>

<style scoped></style>
