<template>
  <v-app>
    <Nav />
    <v-content transition="slide-x-transition">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
  name: "App",
  components: {
    Nav
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

