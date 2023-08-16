"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for cards. */

class Card {
    /** find all card names.
     * Returns [ { oracle_id, name }, ...] 
     * */
    static async findCardsByName(name) {
        const cardsRes = await db.query(
            `SELECT name, oracle_id 
             FROM cards 
             WHERE name ILIKE $1
             GROUP BY name, oracle_id 
             ORDER BY name, oracle_id`, [`%${name}%`]);
        return cardsRes.rows;
    }

    /** find all possible matching card names.
     * queries for all cards similar to name
     * uses trigram matching
     * Returns [ { oracle_id, name }, ...] 
     * */
    static async fuzzyFindCardsByName(name) {
        const cardsRes = await db.query(
            `SELECT name, oracle_id
            FROM cards
            WHERE $1 % ANY(string_to_array(name, ' '))
            GROUP BY name, oracle_id
            ORDER BY SIMILARITY(name, $1) DESC, name, oracle_id`, [name]);
        if (cardsRes.rows.length < 1) throw new NotFoundError();
        return cardsRes.rows;
    }

    /** find card by oracle_id
     *  Returns all cards with matching oracle_id:
     *  [ { card_id, oracle_id, name, image_uris, usd_price, usd_foil_price, usd_etched_price, mana_cost, cmc, type_line,
     *              oracle_text, power, toughness, color_identity, set, set_name, collector_number, rarity,
     *              variation, artist, full_art, textless }, ...] 
     */
    static async findCardsById(id) {
        const cardsRes = await db.query(
            `SELECT *
            FROM cards
            WHERE oracle_id=$1
            ORDER BY set_name, collector_number`, [id]);

        if (cardsRes.rows.length < 1) throw new NotFoundError(`No cards with oracle id: ${id}`);

        return cardsRes.rows;
    }
}

module.exports = Card;
