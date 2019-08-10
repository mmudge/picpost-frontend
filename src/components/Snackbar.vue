<template>
  <v-snackbar top v-model="snackbar" :color="color" :timeout="3000">
    {{ text }}
    <v-btn color="white" text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import store from "@/store.js";

export default {
  name: "Snackbar",
  data() {
    return {
      snackbar: false,
      text: "",
      color: ""
    };
  },
  created() {
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case "setSnackbar":
          this.snackbar = true;
          const snackbar = store.state.snackbar;
          this.text = snackbar.text;
          this.color = snackbar.color;
          break;
      }
    });
  }
};
</script>



