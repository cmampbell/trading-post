"use strict";

/** Routes for cards. */

const express = require("express");
const Card = require("../models/card");

const router = new express.Router();

/** GET /?name='cardNameLike'  =>
 *   { cards: [ { oracle_id, name }, ...] }
 * 
 *  If findCardsByName doesn't return a match
 *  we try fuzzyCardSearch. This handles typos
 *  and names provided from tesseract OCR that
 *  could be inaccurate by a few characters
 * 
 *   Authorization required: none
 */

router.get("/", async function (req, res, next) {
  try {
    let cards = await Card.findCardsByName(req.query.name);
    if (cards.length < 1) {
      cards = await Card.fuzzyFindCardsByName(req.query.name);
    };
    return res.json({ cards });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  =>  { card }
 *
 *  Cards is { id, name, image_uris, usd_price, usd_foil_price, usd_etched_price, mana_cost, cmc, type_line,
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