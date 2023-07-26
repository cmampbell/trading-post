import Api from "./Api";

class User extends Api{

    static async registerUser(regData){
        let res = await Api.request(`auth/register`, regData, 'post');
        this.token = res.token;
        return res.token;
    }

    static async loginUser(loginData){
        let res = await Api.request(`auth/login`, loginData, 'post');
        this.token = res.token;
        return res;
    }

    static async getUser(userId){
        let res = await Api.request(`users/${userId}`);
        return res.user;
    }
}

export default User;