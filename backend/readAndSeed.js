const db = require('./db');
const fs = require('fs')

// This script should only be run once for database setup
// Function to insert a JSON card into the "cards" table
async function insertCard(card) {
  try {
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
        textless
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
      )`;

    const values = [
      card.id, //$1
      card.oracle_id, // $2
      card.name, //$3
      card.image_uris.large, //$4
      card.prices.usd, // $5
      card.prices.usd_foil, //$6
      card.prices.usd_etched, //$7
      card.mana_cost, //$8
      card.cmc, //$9
      card.type_line, //$10
      card.oracle_text, //$11
      card.power, // $12
      card.toughness, // $13
      card.color_identity.join(','), // $14
      card.set, // $15
      card.set_name, // $16
      card.collector_number, // $17
      card.rarity, // $18
      card.variation, // $19
      card.artist, // $20
      card.full_art, // $21
      card.textless // $22
    ];

    await db.query(query, values);

    console.log(`Card "${card.name}" inserted successfully.`);
  } catch (error) {
    console.error(`Error inserting card ${card.name}:`, error);
  }
}

// TO-DO: Replace with script to pull daily bulk data files
// And update database with new prices

// will need to download bulk data from here: https://data.scryfall.io/default-cards/default-cards-20230701090701.json
fs.readFile('./default-cards-20230701090701.json', {}, (error, data) => {
  const cards = JSON.parse(data)
  for (let card of cards) {
    if(card.layout === 'transform'){
      // if dealing with a dual-faced card, modify current card object to use front card image
      card.image_uris = {large: card.card_faces[0].image_uris.large}
    }
    // exclude digital only cards
    if (card.digital === false) insertCard(card);
  }
  db.end()
});

module.exports = insertCard;