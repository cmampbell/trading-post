import axios from 'axios';

// base url for our express API
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// Base API class to handle API requests.
// stores JWT in token if it exists
// request() makes our requests to the API

class Api {

    static token

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${this.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error;
            throw Array.isArray(message) ? message : [message];
        }
    }
};

export default Api;