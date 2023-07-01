const db = require('./db');
const fs = require('fs')

// Function to insert a JSON card into the "cards" table
async function insertCard(card) {
  try {

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
      card.id, //$1
      card.name, //$2
      card.image_uris.large, //$3
      card.prices.usd, // $4
      card.prices.usd_foil, //$5
      card.prices.usd_etched, //$6
      card.mana_cost, //$7
      card.cmc, //$8
      card.type_line, //$9
      card.oracle_text, //$10
      card.power, // $11
      card.toughness, // $12
      card.color_identity.join(','), // $13
      card.set, // $14
      card.set_name, // $15
      card.collector_number, // $16
      card.rarity, // $17
      card.variation, // $18
      card.artist, // $19
      card.full_art, // $20
      card.textless // $21
    ];

    await db.query(query, values);

    console.log(`Card "${card.name}" inserted successfully.`);
  } catch (error) {
    console.error(`Error inserting card ${card.name}:`, error);
  }
}

fs.readFile('./default-cards-20230701090701.json', {}, (error, data)=> {
  const cards = JSON.parse(data)
  for(let card of cards){
    // don't want to add digital only cards
    if(card.digital === false) insertCard(card);
  }
  db.end()
});