import Auth from "@/security/auth";
import store from "@/security/store";

class Guard {
  isGuest(to, from, next) {
    next(!Auth.isValid());
  }

  isAdmin(to, from, next) {
    next(Auth.isValid() || store.getters.user.role === "admin");
  }

  async isAuthenticated(to, from, next) {
    let redirectToLogin = {
      name: "Login",
      query: {
        redirect: to.name
      }
    };

    if (!Auth.isValid()) {
      next(redirectToLogin);
    }

    next(await store.dispatch("getUser"));
  }
}

export default new Guard();
