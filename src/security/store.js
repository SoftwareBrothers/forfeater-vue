import Vue from "vue";
import Vuex from "vuex";
import UserProvider from "@/security/user.provider";

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_FAILED = "AUTH_FAILED";
const STATUS = {
  FAILED: "failed",
  SUCCESS: "success",
  AUTH_FAILED: "failed_auth",
  AUTH_SUCCESS: "success_auth"
};

const state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // user: (await actions.getUser()) || null,
  // user: actions.getUser() || null,
  token: localStorage.getItem("token") || null,
  status: null,
  error: null
};

const getters = {
  user: state => state.user,
  token: state => state.token,
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  getError: state => state.error
};

const mutations = {
  [LOGIN](state, user) {
    state.user = user;
    state.status = STATUS.SUCCESS;
  },
  [LOGOUT](state) {
    state.user = null;
    state.token = null;
    state.status = null;
    state.error = null;
  },
  [AUTH_FAILED](state, error) {
    state.status = STATUS.AUTH_FAILED;
    state.error = error;
  },
  [AUTH_SUCCESS](state, token) {
    state.token = token;
    state.status = STATUS.AUTH_SUCCESS;
  }
};

const actions = {
  authenticate: (context, payload) => {
    new Promise((resolve, reject) => {
      UserProvider.authorize({
        username: payload.username,
        password: payload.password
      })
        .then(data => {
          localStorage.setItem("token", data.access_token);
          context.commit(AUTH_SUCCESS, data.access_token);
          resolve(true);
        })
        .catch(error => {
          context.commit(AUTH_FAILED, error);
          reject(error);
        });
    });
  },
  logout: context => {
    context.commit(LOGOUT);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  getUser: (context, token) => {
    const access_token = token
      ? token
      : localStorage.getItem("token")
        ? localStorage.getItem("token")
        : false;
    if (access_token) {
      return new Promise((resolve, reject) => {
        UserProvider.provide(access_token)
          .then(user => {
            context.commit(LOGIN, user);
            localStorage.setItem("user", JSON.stringify(user));
            resolve(user);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
