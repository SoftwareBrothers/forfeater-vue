import store from "@/security/store";

export default class ApiProvider {
  api = process.env.VUE_APP_API_URL;
  uri = "";

  config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + store.getters.token
    }
  }

  constructor(path) {
    this.uri = this.api + path;
  }
}
