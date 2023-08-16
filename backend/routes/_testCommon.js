"use strict";

const db = require("../db.js");
const { createToken } = require("../helpers/tokens");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const CardCollection = require("../models/cardCollection.js");
const WantList = require("../models/wantList.js");

async function commonBeforeAll() {
  process.env.NODE_ENV = 'test';

  await db.query("DELETE FROM card_want_list");
  await db.query("DELETE FROM card_collection");
  await db.query("DELETE FROM cards");
  await db.query("DELETE FROM users");

  const testCard = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    oracle_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'test Card',
    image_uri: 'test_uri',
    usd_price: '1.54',
    usd_foil_price: '3.45',
    usd_etched_price: '2.57',
    mana_cost: '{R}',
    cmc: 1,
    type_line: 'Test - Card',
    oracle_text: 'This card is for testing purposes only',
    power: '*',
    toughness: '5',
    color_identity: 'R',
    set_code: 'TST',
    set_name: 'Test Set',
    collector_number: '001',
    rarity: 'C',
    variation: false,
    artist: 'Matt',
    full_art: false,
    textless: false,
    art_uri: 'test_art_uri'
  };

  const query = `
  INSERT INTO cards (
    id,
    oracle_id,
    name,
    image_uri,
    usd_price,
    usd_foil_price,
    usd_etched_price,
    mana_cost,
    cmc,
    type_line,
    oracle_text,
    power,
    toughness,
    color_identity,
    set_code,
    set_name,
    collector_number,
    rarity,
    variation,
    artist,
    full_art,
    textless,
    art_uri
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
  )`;

  const values = [
    testCard.id, //$1
    testCard.oracle_id, // $2
    testCard.name, //$3
    testCard.image_uri, //$4
    testCard.usd_price, // $5
    testCard.usd_foil_price, //$6
    testCard.usd_etched_price, //$7
    testCard.mana_cost, //$8
    testCard.cmc, //$9
    testCard.type_line, //$10
    testCard.oracle_text, //$11
    testCard.power, // $12
    testCard.toughness, // $13
    testCard.color_identity, // $14
    testCard.set_code, // $15
    testCard.set_name, // $16
    testCard.collector_number, // $17
    testCard.rarity, // $18
    testCard.variation, // $19
    testCard.artist, // $20
    testCard.full_art, // $21
    testCard.textless, // $22
    testCard.art_uri // $23
  ];

  // adding testCard into db
  await db.query(query, values);

  await db.query(
    `INSERT INTO users (username, password, email, id, created_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING username, email, id`,
    ["user1", await bcrypt.hash("password", BCRYPT_WORK_FACTOR), "test@gmail.com", 1, "2023-07-18"],
  );

  await db.query(
    `INSERT INTO users (username, password, email, id, created_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING username, email, id`,
    ["user2", await bcrypt.hash("password", BCRYPT_WORK_FACTOR), "test@gmail.com", 2, "2023-07-20"],
  );

  await CardCollection.addCardToCollection({
    userID: 1,
    cardID: testCard.id,
    forTrade: true,
    quantity: 1,
    quality: "Near Mint",
    foil: "Yes"
  });

  await WantList.addCardToWantList({
    userID: 2,
    cardID: testCard.id,
    quantity: 4,
    foil: "Yes"
  });
};

async function commonBeforeEach() {
  await db.query("BEGIN");
};

async function commonAfterEach() {
  await db.query("ROLLBACK");
};

async function commonAfterAll() {
  await db.end();
};

let user1Token = createToken({ username: "user1", id: 1 });
let user2Token = createToken({ username: "user2", id: 2 });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  user1Token,
  user2Token,
};
