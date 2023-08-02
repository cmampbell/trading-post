import Api from "./Api";

class CardService {

    static async getCardsByName(name) {
        let res = await Api.request(`cards`, {name})
        return res.cards
    }

    static async getCardsByOracleId(oracleId) {
        let res = await Api.request(`cards/${oracleId}`);
        return res.cards;
    }
}

export default CardService;