import Vue from 'vue';
import Vuex from 'vuex';
import jwtDecode from 'jwt-decode';

import { AuthService } from '@/services/auth.service';
import { getExpireDate } from '@/helper/date.helper';

Vue.use(Vuex);

const service = new AuthService();

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const AUTH = 'AUTH';
const NOTIFICATION = 'NOTIFICATION';
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

const state = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  token: localStorage.getItem('token') || null,
  notification: null,
};

const getters = {
  user: state => state.user,
  token: state => state.token,
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  notification: state => state.notification,
};

const mutations = {
  [LOGIN](state, user) {
    state.user = user;
  },
  [LOGOUT](state) {
    state.user = null;
    state.token = null;
  },
  [AUTH](state, token) {
    state.token = token;
  },
  [NOTIFICATION](state, notification) {
    state.notification = notification;
  },
  [CLEAR_NOTIFICATION](state) {
    state.notification = null;
  },
};

const actions = {
  authenticate: async (context, payload) => {
    const data = await service.authorize({
      email: payload.username,
      password: payload.password,
    });
    if (data) {
      let token = data.accessToken;
      context.commit(AUTH, token);
      localStorage.setItem('token', token);
      const { exp } = jwtDecode(token);
      localStorage.setItem('token_expires_at', getExpireDate(exp));
      return token;
    }
    return false;
  },
  logout: context => {
    context.commit(LOGOUT);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expires_at');
  },
  getUser: context => {
    const token = localStorage.getItem('token') || null;
    if (token) {
      const { first_name, last_name, email } = jwtDecode(token);
      const user = {
        firstName: first_name,
        lastName: last_name,
        email,
      };
      context.commit(LOGIN, user);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return false;
  },
  setNotification: (context, notification) => {
    context.commit(NOTIFICATION, notification);
  },
  removeNotification: context => {
    context.commit(CLEAR_NOTIFICATION);
  },
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
