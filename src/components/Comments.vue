<template>
  <div>
    <v-container v-if="comments">
      <!-- <v-btn color="blue" flat @click="showAllComments = !showAllComments">Show all comments</v-btn> -->

      <v-list two-line subheader>
        <v-subheader>
          <v-btn color="blue" outlined flat @click="showAllComments = !showAllComments">
            Comments
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
        </v-subheader>
        <template v-if="showAllComments">
          <v-list-item v-for="comment in allComments" :key="comment.id">
            <v-list-item-avatar>
              <v-icon>person</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="comment.remark"></v-list-item-title>
              <v-list-item-subtitle
                v-text="prettyDateTime(comment.created_at) + '- ' + comment.user.username"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item v-for="comment in recentComments" :key="comment.id">
            <v-list-item-avatar>
              <v-icon>person</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="comment.remark"></v-list-item-title>
              <v-list-item-subtitle
                v-text="prettyDateTime(comment.created_at) + ' - ' + comment.user.username"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import NewComment from "./NewComment.vue";
import Api from "../api.js";
import store from "@/store.js";

export default {
  name: "Comments",
  components: {},
  props: ["comments"],
  data() {
    return {
      showAllComments: false
    };
  },
  methods: {
    prettyDateTime(date) {
      let firstSplit = date.split("T");
      console.log("first split", firstSplit);
      let month = firstSplit[0].split("-")[1];
      let day = firstSplit[0].split("-")[2];
      let hour = firstSplit[1].split(":")[0];
      let minute = firstSplit[1].split(":")[1];

      return `${hour}:${minute}  ${day}-${month}`;
    }
  },
  computed: {
    recentComments() {
      return this.comments.slice(0, 3);
    },
    allComments() {
      return this.comments;
    }
  }
};
</script>

<style></style>
