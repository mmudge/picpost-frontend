<template>
  <div>
    <h1>Welccome to your profile dashboard {{ getUser.email }}</h1>
    <Mailbox/>
  </div>
</template>

<script>
import Mailbox from "../components/Mailbox.vue";

export default {
  name: "Dashboard",
  components: {
    Mailbox
  },
  computed: {
    getUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>

<style>
</style>
