import Auth from "@/security/auth";
import store from "@/security/store";

class Guard {
  isGuest(to, from, next) {
    next(!Auth.check());
  }
  isAdmin(to, from, next) {
    next(store.getters.user.role == 'admin');
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

  async isAuthenticated2(to, from, next) {

    if(!Auth.check()) {
      next({
        name: "Login",
        query: {
              redirect: to.name
        }
        }
      );
    }

    // let user = await store.dispatch("getUser");
    
    if(to.meta.adminAuth) {
      if(store.getters.user.role != 'admin'){
        next('/user/my-profile')
      }
     }
    
     next(await store.dispatch("getUser"))
  }

//  checkAccess(to, from, next) {
//   if(to.meta.requiresAuth) {
//    if(!Auth.check()) {
//      next('/')
//    }
//    if(to.meta.adminAuth) {
//     if(store.getters.user.role != 'user'){
//       next('/user/my-profile')
//     }
//    }
//   }
//   next()
// }


}

export default new Guard();
