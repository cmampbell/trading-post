import Api from "./Api";

/* Class that handles requests to API endpoints related to users. Handles registering,
*  logging in, and getting user info.
*
*  Uses Api.request to make the actual request, we define the endpoint url here.
*
*  For login and register, we update the token on the API so the new/returning user
*  has credentials to navigate to appropriate pages.
*/

class User {

    static async registerUser(regData){
        let res = await Api.request(`auth/register`, regData, 'post');
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
};

export default User;