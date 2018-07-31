import VueRouter from "vue-router";
import Vue from "vue";
import Home from "@/components/Home";
import About from "@/components/About";

import ChoiceAdd from "@/components/Choice/Add";

import UserList from "@/components/User/List";
import UserCreate from "@/components/User/Create";
import UserEdit from "@/components/User/Edit";

import VendorList from "@/components/Vendor/List";
import VendorCreate from "@/components/Vendor/Create";
import VendorEdit from "@/components/Vendor/Edit";

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
      path: "/users/:id/edit",
      name: "UserEdit",
      component: UserEdit
    },
    {
      path: "/vendors",
      name: "VendorList",
      component: VendorList
    },
    {
      path: "/vendors/create",
      name: "VendorCreate",
      component: VendorCreate
    },
    {
      path: "/vendors/:id/edit",
      name: "VendorEdit",
      component: VendorEdit
    },
  ]
});
