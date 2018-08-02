export default class ApiProvider {
  api = process.env.VUE_APP_API_URL;
  uri = "";
  constructor(path) {
    this.uri = this.api + path;
  }
}
