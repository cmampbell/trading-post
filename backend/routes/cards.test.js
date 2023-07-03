"use strict";

const request = require("supertest");

const app = require("../app");

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

describe("GET /cards", function () {
    test("ok status code", async function () {
        const resp = await request(app).get("/cards");
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({
            cards:
                [
                    {
                        name: 'testCard',
                        oracle_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
                    }
                ]
        });
    });
})

describe("GET /cards/:id", function () {
    test("ok status code", async function () {
        const resp = await request(app).get("/cards/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11");
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({
            cards:
                [
                    {
                        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
                        oracle_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
                        name: 'testCard',
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
                ]
        });
    });

    test("404 if not found", async function () {
        const resp = await request(app).get("/cards/bbbbbbbb-9c0b-4ef8-bb6d-6bb9bd380a11");
        expect(resp.statusCode).toEqual(404)
    })
})