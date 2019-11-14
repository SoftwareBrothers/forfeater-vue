import Auth from '@/security/auth';
import store, { GET_USER } from '@/config/store';

class Guard {
  isGuest(to, from, next) {
    next(!Auth.isValid());
  }

  isAdmin(to, from, next) {
    next(Auth.isValid() && store.getters.user.role === 'admin');
  }

  isAuthenticated(to, from, next) {
    const redirectToLogin = {
      name: 'Login',
      query: {
        redirect: to.name,
      },
    };

    if (!Auth.isValid()) {
      return next(redirectToLogin);
    }

    return next(store.dispatch(GET_USER));
  }
}

export default new Guard();
