import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import ward from "../components/ward.vue";

import { auth } from "../attendancefirebase";
import commentModal from "../components/commentModal.vue";
import settings from "../views/settings.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      requiresAuth:true
    }
    
  },
  {
    path: "/login",
    name: "login",
    component: () => import( /* webpackChunkName: "login" */ '../components/login.vue')
  
  },
  {
    path: "/ward",// ward component indicates the settings/logout options when user is login
    name: "ward",
    component: ward,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: "/commentModal",
    name: "commentModal",
    component: commentModal
  },
  {
    path: "/settings",
    name: "settings",
    component: settings
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.

  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next("/login")
  } else {
    next()
  }
})


export default router;
