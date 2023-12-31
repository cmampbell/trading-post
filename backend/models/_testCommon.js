const db = require("../db.js");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");


const addCardToDB = async (cardToAdd) => {
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
    cardToAdd.id, //$1
    cardToAdd.oracle_id, // $2
    cardToAdd.name, //$3
    cardToAdd.image_uri, //$4
    cardToAdd.usd_price, // $5
    cardToAdd.usd_foil_price, //$6
    cardToAdd.usd_etched_price, //$7
    cardToAdd.mana_cost, //$8
    cardToAdd.cmc, //$9
    cardToAdd.type_line, //$10
    cardToAdd.oracle_text, //$11
    cardToAdd.power, // $12
    cardToAdd.toughness, // $13
    cardToAdd.color_identity, // $14
    cardToAdd.set_code, // $15
    cardToAdd.set_name, // $16
    cardToAdd.collector_number, // $17
    cardToAdd.rarity, // $18
    cardToAdd.variation, // $19
    cardToAdd.artist, // $20
    cardToAdd.full_art, // $21
    cardToAdd.textless, // $22
    cardToAdd.art_uri // $23
  ];

  await db.query(query, values);
}
// This function will seed the test database
// before all test suites are run
async function commonBeforeAll() {
  // clear out cards
  process.env.NODE_ENV = 'test';
  await db.query("DELETE FROM card_want_list");
  await db.query("DELETE FROM card_collection");
  await db.query("DELETE FROM cards");
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM trade_history");

  const testCard1 = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    oracle_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'test Card 1',
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

  const testCard2 = {
    id: '0000579f-7b35-4ed3-b44c-db2a538066fe',
    oracle_id: '1046bc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'test Card 2',
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

  await addCardToDB(testCard1);
  await addCardToDB(testCard2);

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
    ["user2", await bcrypt.hash("password", BCRYPT_WORK_FACTOR), "test2@gmail.com", 2, "2023-07-18"],
  );

  await db.query(
    `INSERT INTO users (username, password, email, id, created_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING username, email, id`,
    ["user3", await bcrypt.hash("password", BCRYPT_WORK_FACTOR), "test2@gmail.com", 3, "2023-10-26"],
  );

  await db.query(
    `INSERT INTO card_collection (user_id, card_id, for_trade, quantity, quality, foil)
      VALUES ($1, $2, $3, $4, $5, $6)`,
    [1, testCard1.id, true, 2, "Lightly Played", "No"]
  );

  await db.query(
    `INSERT INTO card_collection (user_id, card_id, for_trade, quantity, quality, foil)
      VALUES ($1, $2, $3, $4, $5, $6)`,
    [1, testCard2.id, false, 2, "Lightly Played", "No"]
  );

  await db.query(
    `INSERT INTO card_want_list (user_id, card_id, quantity)
          VALUES ($1, $2, $3)`,
    [1, testCard1.id, 4]
  );

  await db.query(
    `INSERT INTO trade_history (id, user1, user2, date_of_trade)
    VALUES ($1, $2, $3, $4)`,
    [1, 1, 2, "2023-10-26"]
  )

  await db.query(
    `INSERT INTO card_trade (trade_id, card_id, traded_price, original_owner)
    VALUES ($1, $2, $3, $4)`,
    [1, testCard1.id, testCard1.usd_price, 2]
  )

  await db.query(
    `INSERT INTO card_trade (trade_id, card_id, traded_price, original_owner)
    VALUES ($1, $2, $3, $4)`,
    [1, testCard2.id, testCard2.usd_price, 1]
  )
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
  commonAfterAll,
};