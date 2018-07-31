import VueRouter from "vue-router";
import Vue from "vue";
import Home from "@/components/Home";
import About from "@/components/About";

import ChoiceAdd from "@/components/Choice/Add";

import UserList from "@/components/User/List";
import UserCreate from "@/components/User/Create";
import UserEdit from "@/components/User/Edit";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/order",
      name: "ChoiceAdd",
      component: ChoiceAdd
    },
    {
      path: "/users",
      name: "UserList",
      component: UserList
    },
    {
      path: "/users/create",
      name: "UserCreate",
      component: UserCreate
    },
    {
      path: "/users/edit",
      name: "UserEdit",
      component: UserEdit
    }
  ]
});
