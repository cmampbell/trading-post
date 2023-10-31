"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for trades. */

class Trade {
    /** find all trades by user.
     *  This query is a doozy.
     *  The SQL query consists of two main parts:
     *          - a Common Table Expression (CTE) named TradeData
     *          - the primary query that groups the data.
     * 
     *  The TradeData CTE retrieves the relevant trade and card data,
     *  avoiding nested aggregation issues.
     * 
     *  The primary query groups the data from the TradeData CTE
     *  to create the final trade history result for the specified user.
     * 
     * The returned result is then:
     * [{trade_id,
     *   date_of_trade,
     *   original_owners_and_cards: {
     *      original_owner: [
     *          {card_id, traded_price, card_info: {cardObject}}
     *                      ]
     *          }}]
     * 
     * Using this structure you send the front end every trade that the user has done,
     * which cards belonged to which user in the trade, the price the cards were traded at, and the card_info
     * */
    static async getUserTrades(id) {
        const userCheck = await db.query(
            `SELECT id FROM users WHERE id = $1`, [id]
        );

        if (!userCheck.rows[0]) throw new NotFoundError(`No trades found for user id: ${id}`);

        const tradeRes = await db.query(
            `WITH TradeData AS (
                SELECT
                    th.id AS trade_id,
                    th.date_of_trade,
                    ct.original_owner,
                    ct.card_id,
                    ct.traded_price,
                    c.name AS card_name,
                    c.oracle_text,
                    c.type_line,
                    c.cmc,
                    c.mana_cost,
                    c.power,
                    c.toughness,
                    c.set_name,
                    c.collector_number
                FROM trade_history th
                LEFT JOIN card_trade ct ON th.id = ct.trade_id
                LEFT JOIN cards c ON ct.card_id = c.id
                WHERE th.user1 = $1 OR th.user2 = $1
            )
            SELECT
                trade_id,
                date_of_trade,
                jsonb_object_agg(original_owner, traded_cards) AS original_owners_and_cards
            FROM (
                SELECT
                    trade_id,
                    date_of_trade,
                    original_owner,
                    json_agg(json_build_object(
                        'card_id', card_id,
                        'traded_price', traded_price,
                        'card_info', jsonb_build_object(
                            'name', card_name,
                            'oracle_text', oracle_text,
                            'type_line', type_line,
                            'cmc', cmc,
                            'mana_cost', mana_cost,
                            'power', power,
                            'toughness', toughness,
                            'set_name', set_name,
                            'collector_number', collector_number
                        )
                    ) ORDER BY traded_price) AS traded_cards
                FROM TradeData
                GROUP BY trade_id, date_of_trade, original_owner
            ) Subquery
            GROUP BY trade_id, date_of_trade
            ORDER BY date_of_trade DESC;`,
            [id]
        );

        return tradeRes.rows;
    }

    /* Record a trade from incoming data
    */
    static async recordTrade(user1, user2, user1Cards, user2Cards) {

    }
}

module.exports = Trade;