"use strict";

const request = require("supertest");

const app = require("../app");
const User = require("../models/user");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    user1Token,
    user2Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /collection/:userId */
describe("GET /collection/:userId", function () {
    test("works for same user", async function () {
        const resp = await request(app)
            .get(`/collection/1`)
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.body).toEqual({ "cards": expect.any(Array) });

        const card = resp.body.cards[0];

        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('oracle_id');
        expect(card).toHaveProperty('image_uri');
        expect(card).toHaveProperty('usd_price');
        expect(card).toHaveProperty('mana_cost');
        expect(card).toHaveProperty('oracle_text')
        expect(card).toHaveProperty('power');
        expect(card).toHaveProperty('toughness');
        expect(card).toHaveProperty('set_name');
        expect(card).toHaveProperty('set_code');
        expect(card).toHaveProperty('collector_number');
        expect(card).toHaveProperty('artist');
    })

    test("unauth for other users", async function () {
        const resp = await request(app)
            .get(`/collection/1`)
            .set("authorization", `Bearer ${user2Token}`);
        expect(resp.statusCode).toEqual(401);
    })

    test("unauth for anon", async function () {
        const resp = await request(app)
            .get(`/collection/1`);
        expect(resp.statusCode).toEqual(401);
    })
})

/************************************** POST /collection/:userId/addCard */

describe("POST /collection/:userId/addCard", function () {

    const newCard = {
        userID: 1,
        cardID: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        foil: "No",
        forTrade: true,
        quality: "Near Mint",
        quantity: 1
    }

    test("works for same user", async function () {
        const resp = await request(app)
            .post(`/collection/1/addCard`)
            .send(newCard)
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.body).toEqual({ "message": `Succesfully added testCard to user1 collection` });
    });

    test("unauthorized for other users", async function () {
        const resp = await request(app)
            .post(`/collection/1/addCard`)
            .send(newCard)
            .set("authorization", `Bearer ${user2Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .post(`/collection/1/addCard`)
            .send(newCard)
        expect(resp.statusCode).toEqual(401);
    });

    test("not found if cardId not found", async function () {
        const resp = await request(app)
            .post(`/collection/1/addCard`)
            .send({ ...newCard, cardID: 'aaaaaa00-9c0b-4ef8-aa1a-6bb9bd380a11' })
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.statusCode).toEqual(404);
    })

    test("bad request if data incomplete", async function () {
        const resp = await request(app)
            .post(`/collection/1/addCard`)
            .send({ cardID: 'a6erbc00-9c0b-4ef8-aa1a-6bb9bd380a11', userID: 1, foil: "Yes" })
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.statusCode).toEqual(400);
    })
});

/************************************** DELETE /collection/:userId/addCard */

describe("DELETE /collection/:userId/delete/:cardId", function () {
    test("works for same user", async function () {
        const resp = await request(app)
            .delete(`/collection/1/delete/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`)
            .set("authorization", `Bearer ${user1Token}`);

        expect(resp.statusCode).toEqual(200)
        expect(resp.body.message).toEqual('Succesfully removed card from collection')
    })

    test("unauthorized for other users", async function () {
        const resp = await request(app)
            .delete(`/collection/1/delete/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`)
            .set("authorization", `Bearer ${user2Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauthorized for anon", async function () {
        const resp = await request(app)
            .delete(`/collection/1/delete/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`)
        expect(resp.statusCode).toEqual(401);
    })
})