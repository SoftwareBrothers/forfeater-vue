export default class ApiProvider {
  api = process.env.VUE_APP_API_URL;
  uri = "";

  config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ` + localStorage.getItem("token")
    }
  };

  constructor(path) {
    this.uri = this.api + path;
  }
}
