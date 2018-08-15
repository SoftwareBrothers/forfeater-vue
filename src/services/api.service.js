import store from "@/security/store";

export default class ApiService {

    config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + store.getters.token
        }
      }

    constructor(){
        this.base = process.env.VUE_APP_API_URL;
    }
    
}
