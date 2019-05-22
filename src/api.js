export default class Api {
  // USERS
  // JOIN, SIGN IN, SIGN OUT
  static userJoin({ commit }, { email, username, password, password_confirmation }) {
    return fetch("http://localhost:3000/signup", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "JWT"
      },
      body: JSON.stringify({
        user: {
          email: email,
          username: username,
          password: password,
          password_confirmation: password_confirmation
        }
      })
    })
      .then(response => {
        response.json();
        router.push("/login");
      })
      .catch(() => {
        commit("setUser", null);
        commit("setIsAuthenticated", false);
        router.push("/");
      });
  }

  static userLogin({ commit }, { email, password }) {
    const u = { user: { email: email, password: password } };
    return fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "JWT"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(u)
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response.username);
        if (response.token) {
          // const token = response.token
          // localStorage.setItem('token', token);
          // console.log(localStorage)
          commit("setUser", response);
          commit("setIsAuthenticated", true);
          console.log("current user is", response);
          router.push("/dashboard");
        }
      })
      .catch(() => {
        commit("setUser", null);
        commit("setIsAuthenticated", false);
        router.push("/");
      });
  }

  static userSignOut({ commit }) {
    return fetch("http://localhost:3000/logout", {
      method: "DELETE",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "JWT"
      },
      body: JSON.stringify(this.state.user)
    }).then(response => {
      commit("setUser", null);
      commit("setIsAuthenticated", false);
      router.push("/");
    });
  }

  static loadUsers() {
    fetch(`http://localhost:3000/users`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        return (this.users = response);
      })
      .catch(error => {
        console.log("load users didnt work", error);
      });
  }

  // POSTS

  static getPosts() {
    fetch(`http://localhost:3000/posts`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        return (this.posts = res);
      })
      .catch(err => {
        console.log("get posts didnt work", err);
      });
  }

  static addPost(newPost) {
    const post = {
      post: {
        title: newPost.title,
        user_id: this.$store.state.user.id
      }
    };

    fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.$store.state.user.token}`
      },
      body: JSON.stringify(post)
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        this.dialogNewPost = false;
        return this.posts.push(response);
      });
  }

  // MESSAGES

  static getMessage() {
    console.log(this.messageId);

    fetch(
      `http://localhost:3000/users/${this.$store.state.user.id}/messages/${
        this.messageId
      }`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.$store.state.user.token}`
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        return (this.message = response);
      })
      .catch(error => {
        console.log("load message didnt work", error);
      });
  }

  static addMessage(newMessage) {
    console.log(JSON.stringify(newMessage));
    const m = {
      message: {
        subject: newMessage.subject,
        body: newMessage.body,
        user_id: this.$store.state.user.id
      }
    };

    return fetch(
      `http://localhost:3000/users/${this.$store.state.user.id}/messages`,
      {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.user.token}`
        },
        body: JSON.stringify(m)
      }
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        this.dialogNewMessage = false;
        return this.messages.push(response);
      })
      .catch(error => {
        console.log("post message didnt work", error);
      });
  }

  static checkMessages() {
    fetch(`http://localhost:3000/users/${this.$store.state.user.id}/messages`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.$store.state.user.token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        return (this.messages = response);
      })
      .catch(error => {
        console.log("load message didnt work", error);
      });
  }

  static deleteMessage(messageId) {
    fetch(
      `http://localhost:3000/users/${
        this.$store.state.user.id
      }/messages/${messageId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.user.token}`
        }
        // body: JSON.stringify({ id: messageId })
      }
    ).then(this.checkMessages());
  }
}
