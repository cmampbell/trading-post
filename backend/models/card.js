"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for companies. */

class Card {
    /** find all card names.
     * Returns [ { oracle_id, name }, ...] 
     * */

    static async findAllCardNames() {
        const cardsRes = await db.query(`SELECT name, oracle_id FROM cards GROUP BY name, oracle_id ORDER BY name, oracle_id`);
        return cardsRes.rows;
    }

    /** find card by oracle_id
     *  Returns all cards with matching oracle_id:
     *  [ { card_id, oracle_id, name, image_uris, usd_price, usd_foil_price, usd_etched_price, mana_cost, cmc, type_line,
     *              oracle_text, power, toughness, color_identity, set, set_name, collector_number, rarity,
     *              variation, artist, full_art, textless }, ...] 
     */
    static async findCardsById(id) {
        const cardsRes = await db.query(`SELECT * FROM cards WHERE oracle_id=$1`, [id])

        if (cardsRes.rows.length < 1) throw new NotFoundError(`No cards with oracle id: ${id}`);

        return cardsRes.rows
    }
}

module.exports = Card;
