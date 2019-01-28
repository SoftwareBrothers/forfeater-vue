class Auth {
  check() {
    return localStorage.getItem("token");
  }
}

export default new Auth();
