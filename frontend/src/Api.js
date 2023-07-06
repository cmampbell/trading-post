import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class TradingPostApi {

    static token

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${TradingPostApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getCardsByName(name) {
        let res = await this.request(`cards`, {name})
        return res.cards
    }

    static async getCardsByOracleId(oracleId) {
        let res = await this.request(`cards/${oracleId}`);
        return res.cards;
    }
}

export default TradingPostApi;