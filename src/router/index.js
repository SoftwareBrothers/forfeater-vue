import VueRouter from "vue-router";
import Vue from "vue";
import Home from "@/components/Home";
import About from "@/components/About";

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
import OrderEdit from "@/components/Order/Edit";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
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

    {
      path: "/vendors/:vendorId/products",
      name: "ProductList",
      component: ProductList
    },
    {
      path: "/vendors/:vendorId/products/create",
      name: "ProductCreate",
      component: ProductCreate
    },
    {
      path: "/vendors/:vendorId/products/:id/edit",
      name: "ProductEdit",
      component: ProductEdit

    },
    {
      path: "/orders",
      name: "OrderList",
      component: OrderList
    },
    {
      path: "/orders/create",
      name: "OrderCreate",
      component: OrderCreate
    },
    { 
      path: "/orders/:id/edit",
      name: "OrderEdit",
      component: OrderEdit
    }

  ]
});
