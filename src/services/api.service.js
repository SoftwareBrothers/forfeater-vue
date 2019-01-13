export default class ApiService {
  config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  constructor() {
    this.base = process.env.VUE_APP_API_URL;
  }
}
