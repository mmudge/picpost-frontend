import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "@/store.js";
import Api from "./api.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Dashboard.vue"),
      meta: {
        authRequired: true
      }
    },
    {
      path: "/messages",
      name: "messages",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Messages.vue"),
      meta: {
        authRequired: true
      }
    },
    {
      path: "/posts",
      name: "posts",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/PostsIndex.vue"),
      meta: { authRequired: true }
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "signin" */ "./views/Login.vue")
    },
    {
      path: "/join",
      name: "join",
      component: () => import(/* webpackChunkName: "join" */ "./views/Join.vue")
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.authRequired)) {
//     if (!store.state.user) {
//       next({
//         path: "/login"
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    Api.getLoggedInUser().then(() => {
      if (!store.state.user) {
        next({
          path: "/login"
        });
      } else {
        next();
      }
    })
  } else {
    next();
  }
});

// make request to /user that returns the current user and sets the token to be the token
// if !user then redirect to sign in
// need to skil before log in and sign up and homepage

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.name === 'home')) {
//     next();
//   } else if (to.matched.some(record => record.name === 'login')) {
//     next();
//   } else if (to.matched.some(record => record.name === 'join')) {
//     next();
//   } else {
//     Api.getLoggedInUser().then(next());
//     // if (Api.getLoggedInUser()) {
//     //   next();
//     // } else {
//     //   console.log('api get looged in user was false');
//     //   next({ path: "/login" })
//     // }
//     // .then((res) => {
//     //   if (res) {
//     //     console.log("got a user in router so we good");
//     //     next();
//     //   } else {
//     //     next({
//     //       path: "/login"
//     //     })
//     //   }
//     // })
//   }
// })


export default router;
