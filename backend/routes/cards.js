"use strict";

/** Routes for cards. */
// We need the server to respond with JSON of all unique card names
// Filtering of cards will happen on the front-end

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const Card = require("../models/card");

const router = new express.Router();

/** GET /  =>
 *   { cards: [ { oracle_id, name }, ...] }
 * 
 *   Authorization required: none
 */

router.get("/", async function (req, res, next) {
    try {
        const cards = await Card.findAllCardNames()
        return res.json({ cards });
    } catch (err) {
        return next(err);
    }
});

/** GET /[id]  =>  { card }
 *
 *  Card is { id, name, image_uris, usd_price, usd_foil_price, usd_etched_price, mana_cost, cmc, type_line,
 *              oracle_text, power, toughness, color_identity, set, set_name, collector_number, rarity,
 *              variation, artist, full_art, textless }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const cards = await Card.findCardsById(req.params.id);
    return res.json({ cards });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
