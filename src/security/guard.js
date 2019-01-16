import Auth from "@/security/auth";
import store from "@/security/store";

class Guard {
  isGuest(to, from, next) {
    next(!Auth.check());
  }

  isAdmin(to, from, next) {
    next(store.getters.user.role == "admin");
  }

  async isAuthenticated(to, from, next) {
    let redirectToLogin = {
      name: "Login",
      query: {
        redirect: to.name
      }
    };

    let redirectToHome = {
      name: "Home",
      query: {
        redirect: to.name
      }
    };

    if (!Auth.check()) {
      next(redirectToLogin);
    }

    if (to.meta.adminAuth) {
      if (store.getters.user.role != "admin") {
        next(redirectToHome);
      }
    }

    next(await store.dispatch("getUser"));
  }
}

export default new Guard();
