import Auth from "@/security/auth";
import store from "@/security/store";

class Guard {
  isGuest(to, from, next) {
    next(!Auth.check());
  }
  async isAuthenticated(to, from, next) {
    next(
      Auth.check()
        ? await store.dispatch("getUser")
        : {
          name: "Login",
          query: {
            redirect: to.name
          }
        }
    );
  }
}

export default new Guard();
