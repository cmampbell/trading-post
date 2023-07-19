"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { id, username, email }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username, password, email, id, created_at
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { id, username, email }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ username, password, email }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Username unavailable: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    // current timestamp in milliseconds
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    const result = await db.query(
      `INSERT INTO users (username, password, email, created_at)
           VALUES ($1, $2, $3, $4)
           RETURNING username, email, id, created_at`,
      [username, hashedPassword, email,(year + "-" + month + "-" + date)],
    );

    const user = result.rows[0];

    return user;
  }

  /** Given an id, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(id) {
    const userRes = await db.query(
      `SELECT username, email, id, created_at
           FROM users
           WHERE id = $1`,
      [id],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user with id: ${id}`);

    // could get want/trade list here or have it be its own method

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { password, email }
   *
   * Returns { username, email, id }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(userId, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {});
    const userIdVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE id = ${userIdVarIdx} 
                      RETURNING username,
                                email,
                                id`;
    const result = await db.query(querySql, [...values, userId]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${userId}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(userId) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE id = $1
           RETURNING username, id, email`,
      [userId],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${userId}`);
  }
}


module.exports = User;