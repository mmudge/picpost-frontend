<template>
  <div>
    <h1>this is the messages page</h1>
    <Mailbox />
  </div>
</template>

<script>
import Mailbox from "../components/Mailbox.vue";

export default {
  name: "Messages",
  components: {
    Mailbox
  }
};
</script>

<style></style>
