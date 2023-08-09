import Api from "./Api";

class User {

    static async registerUser(regData){
        let res = await Api.request(`auth/register`, regData, 'post');
        console.log(res);
        Api.token = res.token;
        return res;
    }

    static async loginUser(loginData){
        let res = await Api.request(`auth/login`, loginData, 'post');
        Api.token = res.token;
        return res;
    }

    static async getUser(userId){
        let res = await Api.request(`users/${userId}`);
        return res.user;
    }
}

export default User;