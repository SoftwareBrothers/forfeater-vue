import Vue from 'vue';
import Vuex from 'vuex';
import { AuthService } from '@/services/auth.service';
import { getExpireDate } from '@/helper/date.helper';

Vue.use(Vuex);

const service = new AuthService();

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const AUTH = 'AUTH';
const NOTIFICATION = 'NOTIFICATION';

const state = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  notification: null
};

const getters = {
  user: state => state.user,
  token: state => state.token,
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  notification: state => state.notification
};

const mutations = {
  [LOGIN](state, user) {
    state.user = user;
  },
  [LOGOUT](state) {
    state.user = null;
    state.token = null;
  },
  [AUTH](state, token, date) {
    state.token = token;
    localStorage.setItem('token', token);
    localStorage.setItem('token_expires_at', getExpireDate(date));
  },
  [NOTIFICATION](state, notification) {
    state.notification = notification;
  }
};

const actions = {
  authenticate: async (context, payload) => {
    const data = await service.authorize({
      username: payload.username,
      password: payload.password
    });
    if (data) {
      let token = data.access_token;
      context.commit(AUTH, token, data.expires_in);
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
  getUser: async (context, token) => {
    const access_token = token || localStorage.getItem('token') || null;
    if (access_token) {
      const data = await service.provide(access_token);
      const user = data.data;
      context.commit(LOGIN, user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
  },
  setNotification: (context, notification) => {
    context.commit(NOTIFICATION, notification);
  }
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
