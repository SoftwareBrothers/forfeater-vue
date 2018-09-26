import VueRouter from "vue-router";
import Vue from "vue";

import Guard from "@/security/guard";

import Login from "@/components/Auth/Login";

import Home from "@/components/Home";
import PageNotFound from "@/components/PageNotFound";

import ChoiceAdd from "@/components/Choice/Add";
import ChoiceScore from "@/components/Choice/Score";

import UserList from "@/components/User/List";
import UserCreate from "@/components/User/Create";
import UserEdit from "@/components/User/Edit";
import UserProfile from "@/components/User/Profile";
import UserChangePassword from "@/components/User/ChangePassword";

import VendorList from "@/components/Vendor/List";
import VendorCreate from "@/components/Vendor/Create";
import VendorEdit from "@/components/Vendor/Edit";

import ProductList from "@/components/Product/List";
import ProductCreate from "@/components/Product/Create";
import ProductEdit from "@/components/Product/Edit";
import ProductShow from "@/components/Product/Show";

import OrderList from "@/components/Order/List";
import OrderCreate from "@/components/Order/Create";
import OrderEdit from "@/components/Order/Edit";

import ChoiceList from "@/components/Choice/List";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "*", component: PageNotFound },
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
      path: "/user/my-profile",
      name: "UserProfile",
      component: UserProfile,
      beforeEnter: Guard.isAuthenticated
    },

    {
      path: "/user/change-password",
      name: "UserChangePassword",
      component: UserChangePassword,
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/users",
      name: "UserList",
      component: UserList,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/users/create",
      name: "UserCreate",
      component: UserCreate,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/users/:id/edit",
      name: "UserEdit",
      component: UserEdit,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors",
      name: "VendorList",
      component: VendorList,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors/create",
      name: "VendorCreate",
      component: VendorCreate,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors/:id/edit",
      name: "VendorEdit",
      component: VendorEdit,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },

    {
      path: "/vendors/:vendorId/products",
      name: "ProductList",
      component: ProductList,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors/:vendorId/products/create",
      name: "ProductCreate",
      component: ProductCreate,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors/:vendorId/products/:id/edit",
      name: "ProductEdit",
      component: ProductEdit,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/vendors/:vendorId/products/:id",
      name: "ProductShow",
      component: ProductShow,
      meta: { adminAuth: true },
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
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/orders/:id/edit",
      name: "OrderEdit",
      component: OrderEdit,
      meta: { adminAuth: true },
      beforeEnter: Guard.isAuthenticated
    },
    {
      path: "/orders/:orderId/choices",
      name: "ChoiceList",
      component: ChoiceList,
      beforeEnter: Guard.isAuthenticated
    },
    {
        path: "/orders/:id/score",
        name: "ChoiceScore",
        component: ChoiceScore,
        beforeEnter: Guard.isAuthenticated
    },

  ]
});
