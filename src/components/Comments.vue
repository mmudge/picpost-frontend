
  <!-- <v-container v-if="comments">
    <v-btn @click="showAllComments = !showAllComments">Show all comments</v-btn>

    <v-list two-line subheader>
      <v-subheader inset>Comments</v-subheader>

      <v-list-item v-for="comment in comments" :key="comment.id">
        <v-list-item-avatar>
          <v-icon>fa fas-user</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="comment.remark"></v-list-item-title>
          <v-list-item-subtitle v-text="comment.user.username"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-if="!showAllComments">
      <v-list two-line v-for="comment in recentComments" :key="comment.id">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ comment.remark }}</v-list-item-title>
            <v-list-item-subtitle>{{ prettyDateTime(comment.created_at) }} - {{comment.user.username}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
    <template v-else>
      <v-list v-for="comment in allComments" :key="comment.id">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ comment.remark }}</v-list-item-title>
            <v-list-item-subtitle>{{ prettyDateTime(comment.created_at) }} - {{comment.user.username}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-container>-->

  <template>
  <v-card max-width="600" class="mx-auto">
    <v-toolbar color="light-blue" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>view_module</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line subheader>
      <v-subheader inset>Folders</v-subheader>

      <v-list-item v-for="item in items" :key="item.title" @click>
        <v-list-item-avatar>
          <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-subheader inset>Files</v-subheader>

      <v-list-item v-for="item in items2" :key="item.title" @click>
        <v-list-item-avatar>
          <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>
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
      showAllComments: true,
      items: [
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Photos",
          subtitle: "Jan 9, 2014"
        },
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Recipes",
          subtitle: "Jan 17, 2014"
        },
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Work",
          subtitle: "Jan 28, 2014"
        }
      ],
      items2: [
        {
          icon: "assignment",
          iconClass: "blue white--text",
          title: "Vacation itinerary",
          subtitle: "Jan 20, 2014"
        },
        {
          icon: "call_to_action",
          iconClass: "amber white--text",
          title: "Kitchen remodel",
          subtitle: "Jan 10, 2014"
        }
      ]
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
