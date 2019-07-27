import store from "@/store.js";

export default class Api {
  // USERS
  // JOIN, SIGN IN, SIGN OUT


  static userJoin(email, username, password, password_confirmation) {
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
        return response.json();

      }).then((response) => {
        console.log('Joined with', response.email, password)
        return response;
      })
      .catch(() => {
        store.commit("setUser", null);
        localStorage.token = null;
      });
  }

  static userLogin(email, password) {
    const u = { user: { email: email, password: password } };
    return fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "JWT"

      },
      body: JSON.stringify(u)
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.token) {
          const token = response.token
          localStorage.setItem('token', token);
          store.commit("setUser", response);

          console.log("user logged in (with token) as", response.email);
          // router.push("/dashboard");
        } else {
          console.log("no token in response, devise session jwt is broke")
        }
      })
      .catch(() => {
        console.log('user log in backend broke')
        store.commit("setUser", null);
        localStorage.token = null;
      });
  }

  static userSignOut() {
    return fetch("http://localhost:3000/logout", {
      method: "DELETE",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "JWT"
      },
      body: JSON.stringify(store.state.user)
    }).then(() => {
      store.commit("setUser", null);
      localStorage.token = null;
      console.log('logged out')
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

  static getLoggedInUser() {

    return fetch(`http://localhost:3000/current_user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log("get user logged in returning this", response);
        if (response.error) {
          store.commit('setUser', null)
          localStorage.token = null
        } else {
          store.commit("setUser", response);
        }
        console.log('should have hit store commits in api get logged in user')
        return response;
      })
      .catch((e)  => {
        console.log("back end broke", e)
        return e
      })
  }

  static getUser(id) {
    fetch(`http://localhost:3000/users/${encodeURIComponent(id)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log("get user logged in", response);
        return response;
      })
      .catch(e => console.log("back end broke", e))
  }

  static getUsers() {
    return fetch(`http://localhost:3000/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log("all users", response)
        return response;
      })
      .catch((e) => {
        console.log("back end broke", e)
      })
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

  static addMessage(messageInfo) {
    const m = {
      message: {
        subject: messageInfo.subject,
        body: messageInfo.body,
        sender_id: store.state.user.id,
        user_id: messageInfo.receiver_id
      }
    };

    return fetch(
      `http://localhost:3000/users/${store.state.user.id}/messages`,
      {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(m)
      }
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log("message response", response);
        return response
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

window.Api = Api
