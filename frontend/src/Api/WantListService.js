import Api from "./Api";
import SetSelectField from "../_common/CardForm/FormInputs/SetSelectField";
import FoilSelectField from "../_common/CardForm/FormInputs/FoilSelectField";
import QuantitySelectField from "../_common/CardForm/FormInputs/QuantitySelectField";

/* Class that handles requests to API endpoints related to a users WantList.
*  Can get want list, add cards to want list, remove cards from want list,
*  edit cards in a user collection. Also stores form fields necessary for
*  the listed operations.
*
*  Uses Api.request to make the actual request, we define the endpoint url here, and pass
*  in relevant data.
*/

class WantList {

    static async getUserWantList(userId) {
        let res = await Api.request(`want-list/${userId}`);
        return res;
    }

    static async addCard(userId, card) {
        card.userID = userId;
        let res = await Api.request(`want-list/${userId}/addCard`, card, "post");
        return res.message;
    }

    static async editCard(userId, cardId, editData) {
        let res = await Api.request(`want-list/${userId}/patch/${cardId}`, editData, "patch");
        return res.card;
    }

    static async removeCard(userId, cardId) {
        let res = await Api.request(`want-list/${userId}/delete/${cardId}`, {}, "delete")
        return res.message;
    }

    static addFields = [
        SetSelectField,
        FoilSelectField,
        QuantitySelectField
    ]

    static editFields = [
        FoilSelectField,
        QuantitySelectField
    ]
};

export default WantList;