const db = require('./db');
const fs = require('fs');

// This script should only be run once for database setup
// Function to insert a JSON card into the "cards" table
async function insertCard(card) {
  try {
    const query = `
      INSERT INTO cards (
        id,
        oracle_id,
        name,
        art_uri,
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
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
      )`;

    const values = [
      card.id, //$1
      card.oracle_id, // $2
      card.name, //$3
      card.image_uris.art_crop, //$4
      card.image_uris.large, //$5
      card.prices.usd, // $6
      card.prices.usd_foil, //$7
      card.prices.usd_etched, //$8
      card.mana_cost, //$9
      card.cmc, //$10
      card.type_line, //$11
      card.oracle_text, //$12
      card.power, // $13
      card.toughness, // $14
      card.color_identity.join(','), // $15
      card.set, // $16
      card.set_name, // $17
      card.collector_number, // $18
      card.rarity, // $19
      card.variation, // $20
      card.artist, // $21
      card.full_art, // $22
      card.textless // $23
    ];

    await db.query(query, values);

    console.log(`Card "${card.name}" inserted successfully.`);
  } catch (error) {
    console.error(`Error inserting card ${card.name}:`, error);
  }
}

// TO-DO: Replace with script to pull daily bulk data files
// And update database with new prices, insert new cards
// will need to download bulk data from here: https://data.scryfall.io/default-cards/default-cards-20230701090701.json

fs.readFile('./default-cards-20231017090458.json', {}, (error, data) => {
  const cards = JSON.parse(data);
  for (let card of cards) {
    // TO-DO add in way to handle split cards
    if (card.layout === 'transform' || card.layout === 'modal_dfc') {
      // if dealing with a dual-faced card, modify current card object to use front card image
      //TO-DO: Have mana cost, oracle text, image_uri include both sides of cards, not just the front
      card.image_uris = {
        large: card.card_faces[0].image_uris.large,
        art_crop: card.card_faces[0].image_uris.art_crop
      };
      card.oracle_text = card.card_faces[0].oracle_text;
      card.mana_cost = card.card_faces[0].mana_cost;
      card.oracle_text = card.card_faces[0].oracle_text;
    } else if (card.layout === 'flip') {
      card.oracle_text = card.card_faces[0].oracle_text;
      card.mana_cost = card.card_faces[0].mana_cost;
      card.oracle_text = card.card_faces[0].oracle_text;
    }
    // exclude digital only cards
    if (card.digital === false) insertCard(card);
  }
});

module.exports = insertCard;