"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");

const {
    NotFoundError,
    BadRequestError,
} = require("../expressError");

class CardCollection {

    /** get the cards in a users collection
    *
    * Returns [ cardObjects, ...]
    *
    * Throws NotFoundError is user not found.
    **/

    static async getCollection(userID) {
        const userCheck = await db.query(`SELECT id FROM users WHERE id = $1`, [userID])

        if (!userCheck.rows[0]) throw new NotFoundError(`User id not found`);

        const cards = await db.query(`
            SELECT * FROM card_collection
            JOIN cards ON card_id = cards.id
            WHERE user_id = $1
        `, [userID])

        return cards.rows;
    }

    /** get the cards in a users collection
    *
    * Returns cardObject
    *
    * Throws NotFoundError is user not found.
    **/

    static async getCardInCollection(userID, cardID) {
        const userCheck = await db.query(`SELECT id FROM users WHERE id = $1`, [userID]);

        if (!userCheck.rows[0]) throw new NotFoundError(`User id not found`);

        const cardCheck = await db.query(`SELECT id FROM cards WHERE id = $1`, [cardID]);

        if (!cardCheck.rows[0]) throw new NotFoundError(`Card not found`);

        const result = await db.query(`
                            SELECT * from card_collection
                            JOIN cards ON card_id = cards.id
                            WHERE user_id=$1 AND card_id=$2`, [userID, cardID])

        if(result.rows.length < 1) throw new NotFoundError(`Card not in collection`);

        return result.rows[0];
    }

    /** add a card to a users collection
    *
    * Returns 'Succesfully added card to collection'.
    *
    * Throws NotFoundError is user or card not found in db.
    **/

    static async addCardToCollection({ userID, cardID, forTrade, quantity, quality, foil }) {

        const userCheck = await db.query(`SELECT id FROM users WHERE id = $1`, [userID]);

        if (!userCheck.rows[0]) throw new NotFoundError(`User id not found`);

        const cardCheck = await db.query(`SELECT id FROM cards WHERE id = $1`, [cardID]);

        if (!cardCheck.rows[0]) throw new NotFoundError(`Card not found`);

        await db.query(`
            INSERT INTO card_collection (user_id, card_id, for_trade, quantity, quality, foil)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING user_id, card_id`,
            [userID, cardID, forTrade, quantity, quality, foil]);

        return 'Succesfully added card to collection';
    }

    /** update the cards in a users collection
    * data can include { forTrade, quanitity, quality, foil }
    *
    * Returns updated cardObject
    *
    * Throws NotFoundError is user not found.
    **/

    static async updateCardInCollection(userID, cardID, data) {
        if(data.userID) throw new BadRequestError('Cannot update userID');
        if(data.cardID) throw new BadRequestError('Cannot update cardID');

        const userCheck = await db.query(`SELECT id FROM users WHERE id = $1`, [userID]);
        if (!userCheck.rows[0]) throw new NotFoundError(`User id not found`);

        const cardCheck = await db.query(`SELECT id FROM cards WHERE id = $1`, [cardID]);
        if (!cardCheck.rows[0]) throw new NotFoundError(`Card not found`);


        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                forTrade: "for_trade",
            });
        const userIDVarIdx = "$" + (values.length + 1);
        const cardIDVarIdx = "$" + (values.length + 2);

        const querySql = `UPDATE card_collection
                            SET ${setCols} 
                            WHERE user_id = ${userIDVarIdx} AND card_id = ${cardIDVarIdx}
                            RETURNING *`;
        const result = await db.query(querySql, [...values, userID, cardID]);

        return result.rows[0];
    }

    /** remove a card to a users collection
    *
    * Returns 'Succesfully removed card from collection'.
    *
    * Throws NotFoundError is user or card not found in db.
    **/
    static async removeCardFromCollection({ userID, cardID }) {

        await db.query(
            `DELETE FROM card_collection
                WHERE user_id=$1 AND card_id=$2
                RETURNING user_id, card_id`, [userID, cardID]);

        return 'Succesfully removed card from collection';
    }
}

module.exports = CardCollection;