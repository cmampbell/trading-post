"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for trades. */

class Trade {
    /** find all trades by user.
     *  We want to return rows of trades, with cards
     * */
    static async getUserTrades(id) {
        const userCheck = await db.query(
            `SELECT id FROM users WHERE id = $1`, [id]
        );

        if (!userCheck.rows[0]) throw new NotFoundError(`No trades found for user id: ${id}`);

        // need to search for trades involving users id
        const tradeRes = await db.query(
            `SELECT * FROM trade_history as th
                 JOIN card_trade ON trade_id = th.id
                 WHERE user1 = $1 OR user2 = $1`,
            [id],
        );

        console.log(tradeRes.rows);
        return tradeRes.rows;
    }

    /* Record a trade from incoming data
    */
    static async recordTrade(user1, user2, user1Cards, user2Cards) {

    }
}

module.exports = Trade;
