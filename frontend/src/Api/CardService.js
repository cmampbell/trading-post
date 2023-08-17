import Api from "./Api";

/* Class that handles requests to API endpoints related to card information. Can search a card
*  by name or by oracle id. Returns an array of card results.
*
*  Uses Api.request to make the actual request, we define the endpoint url here/
*/

class CardService {

    static async getCardsByName(name) {
        let res = await Api.request(`cards`, { name });
        return res.cards;
    }

    static async getCardsByOracleId(oracleId) {
        let res = await Api.request(`cards/${oracleId}`);
        return res.cards;
    }
};

export default CardService;