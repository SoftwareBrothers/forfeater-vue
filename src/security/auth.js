import { isExpired } from "@/helper/date.helper";
import store from "@/security/store";

class Auth {
  check() {
    const token = localStorage.getItem("token") || false;
    const date = localStorage.getItem("token_expire") || false;
    if (token && !isExpired(date)) {
      return true;
    }
    store.dispatch("logout");
    return false;
  }
}

export default new Auth();
