import Vue from 'vue';
import Vuex from 'vuex';
import UserProvider from '@/security/user.provider';
import { getExpireDate } from '@/helper/date.helper';

Vue.use(Vuex);

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILED = 'AUTH_FAILED';
const STATUS = {
  FAILED: 'failed',
  SUCCESS: 'success',
  AUTH_FAILED: 'failed_auth',
  AUTH_SUCCESS: 'success_auth'
};

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
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
  authenticate: async (context, payload) => {
    const response = await UserProvider.authorize({
      username: payload.username,
      password: payload.password
    });
    const data = response.data;
    let token = data.access_token;
    context.commit(AUTH_SUCCESS, token);
    localStorage.setItem('token', token);
    localStorage.setItem('token_expires_at', getExpireDate(data.expires_in));
    return token;
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
      const data = await UserProvider.provide(access_token);
      const user = data.data;
      context.commit(LOGIN, user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
  }
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
