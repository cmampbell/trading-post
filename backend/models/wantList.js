"use strict";

const db = require("../db");

const {
    NotFoundError,
    BadRequestError,
} = require("../expressError");

const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for want lists. */

class WantList {

    /** get all cards in a users want list
    *
    * Returns [ cardObjects, ...]
    *
    * Throws NotFoundError is user not found.
    **/

    static async getWantList(userID) {
        const userCheck = await db.query(`SELECT id, username FROM users WHERE id = $1`, [userID]);

        if (!userCheck.rows[0]) throw new NotFoundError(`User id not found`);

        const cards = await db.query(`
            SELECT * FROM card_want_list
            JOIN cards ON card_id = cards.id
            WHERE user_id = $1
        `, [userID]);

        cards.owner = userCheck.rows[0].username;

        return cards;
    }

    /** get a specific card in a users want list
    *
    * Returns cardObject
    *
    * Throws NotFoundError is user not found.
    **/

    static async getCardInWantList(userID, cardID) {
        const userCheck = await db.query(`SELECT id FROM users WHERE id = $1`, [userID]);

        if (!userCheck.rows[0]) throw new NotFoundError(`User id not found`);

        const cardCheck = await db.query(`SELECT id FROM cards WHERE id = $1`, [cardID]);

        if (!cardCheck.rows[0]) throw new NotFoundError(`Card not found`);

        const result = await db.query(`
                            SELECT * from card_want_list
                            JOIN cards ON card_id = cards.id
                            WHERE user_id=$1 AND card_id=$2`, [userID, cardID]);

        if (result.rows.length < 1) throw new NotFoundError(`Card not in want list`);

        return result.rows[0];
    }

    /** add a card to a users want list
    *
    * Returns 'Succesfully added card to want list'.
    *
    * Throws NotFoundError is user or card not found in db.
    **/

    static async addCardToWantList({ userID, cardID, quantity, foil }) {

        const userCheck = await db.query(`SELECT id, username FROM users WHERE id = $1`, [userID]);

        if (!userCheck.rows[0]) throw new NotFoundError(`User id not found`);

        const cardCheck = await db.query(`SELECT id, name FROM cards WHERE id = $1`, [cardID]);

        if (!cardCheck.rows[0]) throw new NotFoundError(`Card not found`);

        await db.query(`
            INSERT INTO card_want_list (user_id, card_id, quantity, foil)
                VALUES ($1, $2, $3, $4)
                RETURNING user_id, card_id`,
            [userID, cardID, quantity, foil]);

        return `Succesfully added ${cardCheck.rows[0].name} to ${userCheck.rows[0].username} want list`;
    }

    /** update the cards in a users want list
    * data can include { quantity, foil }
    *
    * Returns updated cardObject
    *
    * Throws NotFoundError is user not found.
    **/

    static async updateCardInWantList(userID, cardID, data) {
        if (data.userID) throw new BadRequestError('Cannot update userID');
        if (data.cardID) throw new BadRequestError('Cannot update cardID');

        const userCheck = await db.query(`SELECT id FROM users WHERE id = $1`, [userID]);
        if (!userCheck.rows[0]) throw new NotFoundError(`User id not found`);

        const cardCheck = await db.query(`SELECT id FROM cards WHERE id = $1`, [cardID]);
        if (!cardCheck.rows[0]) throw new NotFoundError(`Card not found`);


        const { setCols, values } = sqlForPartialUpdate(data, {});
        const userIDVarIdx = "$" + (values.length + 1);
        const cardIDVarIdx = "$" + (values.length + 2);

        const querySql = `UPDATE card_want_list
                            SET ${setCols} 
                            WHERE user_id = ${userIDVarIdx} AND card_id = ${cardIDVarIdx}
                            RETURNING *`;
        const result = await db.query(querySql, [...values, userID, cardID]);

        return result.rows[0];
    }

    /** remove a card to a users want list
    *
    * Returns 'Succesfully removed card from collection'.
    *
    * Throws NotFoundError is user or card not found in db.
    **/
    static async removeCardFromWantList(userID, cardID) {

        await db.query(
            `DELETE FROM card_want_list
                WHERE user_id=$1 AND card_id=$2
                RETURNING user_id, card_id`, [userID, cardID]);

        return 'Succesfully removed card from want list';
    }
}

module.exports = WantList;