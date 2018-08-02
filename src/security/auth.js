class Auth {
  check() {
    return localStorage.getItem("user");
  }
}

export default new Auth();
