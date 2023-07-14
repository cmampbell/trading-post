"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const CardCollection = require("../models/cardCollection")
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/** GET /[id]/collection => { cards }
 *
 * Returns { cardObjects, ... }
 *
 * Authorization required: none
 **/
router.get("/:id/collection", async function (req, res, next) {
  try{
    const cards = await CardCollection.getCollection(req.params.id);
    return res.json({cards})
  } catch (err) {
    return next(err);
  }
})

/** GET /[id] => { user }
 *
 * Returns { username, email, id, created_at }
 *
 * Authorization required: none
 **/

router.get("/:id", async function (req, res, next) {
  try {
    const user = await User.get(req.params.id);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] { user } => { user }
 *
 * Data can include:
 *   { password, email }
 *
 * Returns { username, email, id }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.id, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
