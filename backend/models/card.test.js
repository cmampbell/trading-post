"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Card = require("./card.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("findAll", function () {
    test("works", async function () {
      let cards = await Card.findAll();
      expect(cards).toEqual([
        {
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
        }
      ]);
    });
});