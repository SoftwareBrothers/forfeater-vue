import { isExpired } from "@/helper/date.helper";
import store from "@/security/store";

class Auth {
  isValid() {
    const token = localStorage.getItem("token") || null;
    const date = localStorage.getItem("token_expires_at") || null;
    if (token && !isExpired(date)) {
      return true;
    }
    store.dispatch("logout");
    return false;
  }
}

export default new Auth();
