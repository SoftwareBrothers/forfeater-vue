export default class ApiProvider {
    constructor(path){
        this.uri = process.env.VUE_APP_API_URL + path;
    }
    
}
