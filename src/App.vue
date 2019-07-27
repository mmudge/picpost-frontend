<template>
  <v-app>
    <Snackbar />
    <Nav />
    <v-content transition="slide-x-transition">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import Snackbar from "./components/Snackbar.vue";
export default {
  name: "App",
  components: {
    Nav,
    Snackbar
  },
  data() {
    return {};
  }
};
</script>

<style>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

