"use strict";

/** Routes for want lists. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const WantList = require("../models/wantList")
const newCardInWantListSchema = require("../schemas/newCardInWantList.json");
const updateCardInWantListSchema = require("../schemas/updateCardInWantList.json");

const router = express.Router();

/** GET /[userId] => { cards }
 *
 * Returns { cardObjects, ... }
 *
 * Authorization required: none
 **/
router.get("/:userId", ensureLoggedIn, async function (req, res, next) {
    try {
        const cards = await WantList.getWantList(req.params.userId);
        return res.json({ cards: cards.rows, owner: cards.owner })
    } catch (err) {
        return next(err);
    }
})

/** POST /[userId]/addCard => { message }
 *
 * Returns { string }
 *
 * Authorization required: same-user
 **/
router.post("/:userId/addCard", ensureCorrectUser, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, newCardInWantListSchema);

        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        };

        const message = await WantList.addCardToWantList({ ...req.body, userId: req.params.userId });
        return res.json({ message });
    } catch (err) {
        return next(err);
    }
})

/** PATCH /[userId]/patch/[cardId] { editData } =>  { card }
 *
 * Data can include:
 *   { quantity, foil }
 *
 * Returns { cardObj }
 *
 * Authorization required: same-user-as-:userId
 **/

router.patch("/:userId/patch/:cardId", ensureCorrectUser, async function (req, res, next) {
    try {
        const { userId, cardId } = req.params;
        const validator = jsonschema.validate({ ...req.body }, updateCardInWantListSchema);

        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        };

        const card = await WantList.updateCardInWantList(userId, cardId, req.body);
        return res.json({ card });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[userId]/delete/[cardId] => { message }
 *
 * Returns { string }
 *
 * Authorization required: same-user
 **/

router.delete("/:userId/delete/:cardId", ensureCorrectUser, async function (req, res, next) {
    try {
        const { userId, cardId } = req.params;
        const message = await WantList.removeCardFromWantList(userId, cardId);
        return res.json({ message });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;