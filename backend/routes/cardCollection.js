"use strict";

/** Routes for card collections. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const CardCollection = require("../models/cardCollection")
const newCardInCollectionSchema = require("../schemas/newCardInCollection.json")

const router = express.Router();

/** GET /[userId] => { cards }
 *
 * Returns { cardObjects, ... }
 *
 * Authorization required: none
 **/
router.get("/:userId", ensureCorrectUser, async function (req, res, next) {
    try{
      const cards = await CardCollection.getCollection(req.params.userId);
      return res.json({cards})
    } catch (err) {
      return next(err);
    }
  })
  
/** POST /:userId/addCard => { message }
 *
 * Returns { string }
 *
 * Authorization required: same-user
 **/
router.post("/:userId/addCard", ensureCorrectUser, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, newCardInCollectionSchema);

        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        
        const message = await CardCollection.addCardToCollection({ ...req.body, userId: req.params.userId });
        return res.json({ message })
    } catch (err) {
        return next(err);
    }
})

// /** PATCH /[id] { user } => { user }
//  *
//  * Data can include:
//  *   { password, email }
//  *
//  * Returns { username, email, id }
//  *
//  * Authorization required: same-user-as-:username
//  **/

// router.patch("/:id", ensureCorrectUser, async function (req, res, next) {
//     try {
//         const validator = jsonschema.validate(req.body, userUpdateSchema);
//         if (!validator.valid) {
//             const errs = validator.errors.map(e => e.stack);
//             throw new BadRequestError(errs);
//         }

//         const user = await User.update(req.params.id, req.body);
//         return res.json({ user });
//     } catch (err) {
//         return next(err);
//     }
// });

/** DELETE /[userId]/delete/[cardId] => { message }
 *
 * Returns { string }
 *
 * Authorization required: same-user
 **/

router.delete("/:userId/delete/:cardId", ensureCorrectUser, async function (req, res, next) {
    try {
        const message = await CardCollection.removeCardFromCollection(req.params);
        return res.json({ message });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;