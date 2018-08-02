import Vue from "vue";
import Vuex from "vuex";
import UserProvider from "@/security/user.provider";

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const state = {
  user: JSON.parse(localStorage.getItem("user")) || null
};

const getters = {
  getUser: state => state.user
};

const mutations = {
  [LOGIN](state, payload) {
    state.user = payload;
  },
  [LOGOUT](state) {
    state.user = null;
  }
};

const actions = {
  login: (context, payload) => {
    new Promise((resolve, reject) => {
      // UserProvider.provide({
      //   username: payload.username,
      //   password: payload.password
      // })
      //   .then(result => {
      let result = {
        firstName: "Marek",
        lastName: "f",
        email: "test@test.pl",
        role: "admin",
        token: "blabla"
      };
      context.commit(LOGIN, result);
      localStorage.setItem("user", JSON.stringify(result));
      //     resolve(true);
      //   })
      //   .error(err => {
      //     reject(err);
      //   });
      resolve();
    });
  },
  logout: context => {
    context.commit(LOGOUT);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
