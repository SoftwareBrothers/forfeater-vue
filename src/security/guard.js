import Auth from "@/security/auth";

class Guard {
  isGuest(to, from, next) {
    next(!Auth.check());
  }
  isAuthenticated(to, from, next) {
    next(
      Auth.check()
        ? true
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
