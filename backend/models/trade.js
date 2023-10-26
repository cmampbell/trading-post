"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for trades. */

class Trade {
    /** find all trades by user.
     * */
    static async getUserTrades(id) {
    }

    /* Record a trade from incoming data
    */
    static async recordTrade(user1, user2, user1Cards, user2Cards){

    }
}

module.exports = Card;
