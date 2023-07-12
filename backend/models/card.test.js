"use strict";

const { NotFoundError } = require("../expressError");
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

describe("findCardsByName", function () {
    test("works", async function () {
      let cards = await Card.findCardsByName('testCard');
      expect(cards).toEqual([
        {
          name: 'testCard1',
          oracle_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
        },
        {oracle_id: '1046bc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'testCard2'},
      ]);
    });
});

describe("findCardsById", function () {
  test("works", async function () {
    let cards = await Card.findCardsById('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
    expect(cards).toEqual([
      {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        oracle_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'testCard1',
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
        textless: false
      }
    ]);
  });

  test("returns error if card id not found", async function () {
    try {
      await Card.findCardsById('bbbbbbbb-9c0b-4ef8-bb6d-6bb9bd380a11');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })
});