import VueRouter from "vue-router";
import Vue from "vue";

import Guard from "@/security/guard";

import Home from "@/components/Home";

import Login from "@/components/Auth/Login";

import ChoiceAdd from "@/components/Choice/Add";

import UserList from "@/components/User/List";
import UserCreate from "@/components/User/Create";
import UserEdit from "@/components/User/Edit";

import VendorList from "@/components/Vendor/List";
import VendorCreate from "@/components/Vendor/Create";
import VendorEdit from "@/components/Vendor/Edit";

import ProductList from "@/components/Product/List";
import ProductCreate from "@/components/Product/Create";
import ProductEdit from "@/components/Product/Edit";

import OrderList from "@/components/Order/List";
import OrderCreate from "@/components/Order/Create";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: Guard.isGuest
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/order",
      name: "ChoiceAdd",
      component: ChoiceAdd,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/users",
      name: "UserList",
      component: UserList,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/users/create",
      name: "UserCreate",
      component: UserCreate,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/users/:id/edit",
      name: "UserEdit",
      component: UserEdit,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors",
      name: "VendorList",
      component: VendorList,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors/create",
      name: "VendorCreate",
      component: VendorCreate,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors/:id/edit",
      name: "VendorEdit",
      component: VendorEdit,
      beforeEnter: Guard.isAuthenticated
    },

    {
      path: "/vendors/:vendorId/products",
      name: "ProductList",
      component: ProductList,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors/:vendorId/products/create",
      name: "ProductCreate",
      component: ProductCreate,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors/:vendorId/products/:id/edit",
      name: "ProductEdit",
      component: ProductEdit,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/orders",
      name: "OrderList",
      component: OrderList,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/orders/create",
      name: "OrderCreate",
      component: OrderCreate,
      beforeEnter: Guard.isAuthenticated
    }

  ]
});
