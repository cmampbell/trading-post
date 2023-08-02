import Api from './Api'
import SetSelectField from "../_common/CardForm/FormInputs/SetSelectField";
import FoilSelectField from "../_common/CardForm/FormInputs/FoilSelectField";
import QualitySelectField from "../_common/CardForm/FormInputs/QualitySelectField";
import QuantitySelectField from "../_common/CardForm/FormInputs/QuantitySelectField";
import ForTradeField from "../_common/CardForm/FormInputs/ForTradeField";

class CardCollection {

    static async getUserCollection(userId){
        let res = await Api.request(`collection/${userId}/`);
        return res.cards;
    }

    static async getUserCardsForTrade(userId){
        let res = await Api.request(`collection/${userId}/forTrade`);
        return res.cards;
    }

    static async addCard(userId, card){
        card.userID = userId;
        let res = await Api.request(`collection/${userId}/addCard`, card, "post");
        return res.message;
    }

    static async removeCard(userId, cardId){
        let res = await Api.request(`collection/${userId}/delete/${cardId}`, {}, "delete");
        return res.message;
    }

    static async editCard(userId, cardId, editData){
        let res = await Api.request(`collection/${userId}/patch/${cardId}`, editData, "patch");
        return res.card;
    }

    static addFields = [
        SetSelectField,
        QualitySelectField,
        FoilSelectField,
        QuantitySelectField,
        ForTradeField,
    ]

    static editFields = [
        QualitySelectField,
        FoilSelectField,
        QuantitySelectField,
        ForTradeField,
    ]
};

export default CardCollection;