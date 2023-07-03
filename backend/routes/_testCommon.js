"use strict";

const db = require("../db.js");

async function commonBeforeAll() {
  process.env.NODE_ENV = 'test'
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM cards");

  const testCard = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'testCard',
    image_uris: 'test_uri',
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
    textless: false
  };

  const query = `
  INSERT INTO cards (
    id,
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
    textless
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
  )`;

  const values = [
    testCard.id, //$1
    testCard.name, //$2
    testCard.image_uris, //$3
    testCard.usd_price, // $4
    testCard.usd_foil_price, //$5
    testCard.usd_etched_price, //$6
    testCard.mana_cost, //$7
    testCard.cmc, //$8
    testCard.type_line, //$9
    testCard.oracle_text, //$10
    testCard.power, // $11
    testCard.toughness, // $12
    testCard.color_identity, // $13
    testCard.set, // $14
    testCard.set_name, // $15
    testCard.collector_number, // $16
    testCard.rarity, // $17
    testCard.variation, // $18
    testCard.artist, // $19
    testCard.full_art, // $20
    testCard.textless // $21
  ];

  db.query(query, values)
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
};
