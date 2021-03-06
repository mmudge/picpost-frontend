import store from "@/store.js";

export default class Api {

  static directUpload(attachment) {
    return fetch("http://localhost:3000//rails/active_storage/direct_uploads", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ photo: attachment })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log('photo upload got a response', response)
        return response
      })
      .catch(() => {
        console.log('photo upload backend broke')
      });
  }
  // USERS

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
        console.log('response before looking for token', response)
        if (response.token) {
          const token = response.token
          localStorage.setItem('token', token);
          store.commit("setUser", response);

          console.log("user logged in (with token) as", response.email);
          // router.push("/dashboard");
        }
        return response
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
    }).then((result) => {
      store.commit("setUser", null);
      localStorage.token = null;
      console.log('logged out')
      return result
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
        if (response.errors) {
          store.commit('setUser', null)
          localStorage.token = null
          return response.errors
        } else {
          store.commit("setUser", response);
          console.log('User logged in as ', response.email)
          return response
        }

      })
      .catch((e)  => {
        console.log("back end broke", e)
        return e
      })
  }

  static getUser(id) {
    return fetch(`http://localhost:3000/users/${id}`, {
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
        console.log("get user ", response);
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
        return response;
      })
      .catch((e) => {
        console.log("back end broke", e)
      })
  }

  // POSTS


  static getPost(id) {
    return fetch(`http://localhost:3000/posts/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        return res
      })
      .catch(err => {
        console.log("get posts backend broke", err);
      });
  }

  static getPosts() {
    return fetch(`http://localhost:3000/posts`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        return res
      })
      .catch(err => {
        console.log("get posts backend broke", err);
      });
  }

  static createPost(newPost) {
    const post = {
      post: {
        title: newPost.title,
        user_id: newPost.user_id
      }
    };

    return fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(post)
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        return response
      });
  }

  static updatePost(updatedPost) {
    let post = {}
    if (updatedPost.title) {
      post = {
        post: {
          title: updatedPost.title,
          user_id: updatedPost.user_id
        }
      }
    } else if (updatedPost.like) {
      post = {
        post: {
          like: 1
        }
      }
    } else if (updatedPost.dislike) {
      post = {
        post: {
          dislike: 1
        }
      }
    } else {
      post = {}
      console.log('nothing passed to update')
    }


    return fetch(`http://localhost:3000/posts/${updatedPost.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(post)
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        return response
      });
  }

  static deletePost(postId) {
    return fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
  }

  // MESSAGES

  static getMessage(id) {
    return fetch(
      `http://localhost:3000/users/${store.state.user.id}/messages/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        return response;
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

  static getReceivedMessages() {
    return fetch(`http://localhost:3000/users/${store.state.user.id}/received_messages`, {
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
        return response;
      })
      .catch(error => {
        console.log("back end received messages broke", error);
      });
  }

  static getSentMessages() {
    return fetch(`http://localhost:3000/users/${store.state.user.id}/sent_messages`, {
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
        return response;
      })
      .catch(error => {
        console.log("back end received messages broke", error);
      });
  }

  static deleteMessage(messageId) {
    return fetch(
      `http://localhost:3000/users/${
        store.state.user.id
      }/messages/${messageId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`
        }
      })
  }

  // COMMENTS

  static createComment(postId, comment) {
    console.log("comment being passed to api", comment)
    // const new_comment =   { remark: comment.remark, user_id: comment.user_id }
      console.log("comment being used in fetch POST", comment)


    return fetch(`http://localhost:3000/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({comment: comment} )
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log('did the comment work?', response)
        return response
      });
  }


  static getComments(postId) {
    return fetch(`http://localhost:3000/posts/${postId}/comments`, {
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
        return response;
      })
      .catch(error => {
        console.log("back end received messages broke", error);
      });
  }
}

window.Api = Api
