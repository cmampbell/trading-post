"use strict";

const request = require("supertest");

const app = require("../app");

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

/************************************** GET /want-list/:userId */
describe("GET /want-list/:userId", function () {
    test("works for same user", async function () {
        const resp = await request(app)
            .get(`/want-list/2`)
            .set("authorization", `Bearer ${user2Token}`);
        expect(resp.statusCode).toEqual(200);
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

    test("works for other users", async function () {
        const resp = await request(app)
            .get(`/want-list/2`)
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.statusCode).toEqual(200);
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

    test("unauth for anon", async function () {
        const resp = await request(app)
            .get(`/want-list/2`);
        expect(resp.statusCode).toEqual(401);
    })
})

/************************************** POST /want-list/:userId/addCard */

describe("POST /want-list/:userId/addCard", function () {

    const newCard = {
        userID: 1,
        cardID: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        foil: "No",
        quantity: 1
    }

    test("works for same user", async function () {
        const resp = await request(app)
            .post(`/want-list/1/addCard`)
            .send(newCard)
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.body).toEqual({ "message": `Succesfully added test Card to user1 want list` });
    });

    test("unauthorized for other users", async function () {
        const resp = await request(app)
            .post(`/want-list/1/addCard`)
            .send(newCard)
            .set("authorization", `Bearer ${user2Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .post(`/want-list/1/addCard`)
            .send(newCard)
        expect(resp.statusCode).toEqual(401);
    });

    test("not found if cardId not found", async function () {
        const resp = await request(app)
            .post(`/want-list/1/addCard`)
            .send({ ...newCard, cardID: 'a2aaaa00-9c0b-4ef8-aa1a-6bb9bd380a11' })
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.statusCode).toEqual(404);
    })

    test("bad request if data incomplete", async function () {
        const resp = await request(app)
            .post(`/want-list/1/addCard`)
            .send({ cardID: 'a6erbc00-9c0b-4ef8-aa1a-6bb9bd380a11', userID: 1, foil: "Yes" })
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.statusCode).toEqual(400);
    })
});

/************************************** PATCH /want-list/:userID/patch/:cardID */

describe("PATCH /want-list/:userID/patch/:cardID", function () {

    const userID = 2;
    const cardID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    const cardUpdateData = {
        foil: "Etched",
        quantity: 50,
    };

    test("works for same user", async function () {

        const resp = await request(app)
            .patch(`/want-list/2/patch/${cardID}`)
            .send(cardUpdateData)
            .set("authorization", `Bearer ${user2Token}`);

        const { card } = resp.body;

        expect(card.quantity).toEqual(50);
        expect(card.foil).toEqual("Etched");
    });

    test("unauthorized for other users", async function () {
        const resp = await request(app)
            .patch(`/want-list/${userID}/patch/${cardID}`)
            .send(cardUpdateData)
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .patch(`/want-list/${userID}/patch/${cardID}`)
            .send(cardUpdateData)
        expect(resp.statusCode).toEqual(401);
    });

    test("not found if cardId not found", async function () {
        const resp = await request(app)
            .patch(`/want-list/${userID}/patch/0000bc99-9c0b-4ef8-bb6d-6bb9bd380a11`)
            .send(cardUpdateData)
            .set("authorization", `Bearer ${user2Token}`);
        expect(resp.statusCode).toEqual(404);
    })

    test("works for partial update", async function () {
        const resp = await request(app)
            .patch(`/want-list/${userID}/patch/${cardID}`)
            .send({ foil: "Etched" })
            .set("authorization", `Bearer ${user2Token}`);
        expect(resp.statusCode).toEqual(200);

        const { card } = resp.body;

        expect(card.quantity).toEqual(4);
        expect(card.foil).toEqual("Etched");
    })

    test("bad request with bad data", async function () {
        const resp = await request(app)
            .patch(`/want-list/${userID}/patch/${cardID}`)
            .send({ userId: 1, invalid: ':(' })
            .set("authorization", `Bearer ${user2Token}`);
        expect(resp.statusCode).toEqual(400);
    })
});

/************************************** DELETE /want-list/:userId/delete/:cardId */

describe("DELETE /want-list/:userId/delete/:cardId", function () {
    test("works for same user", async function () {
        const resp = await request(app)
            .delete(`/want-list/2/delete/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`)
            .set("authorization", `Bearer ${user2Token}`);

        expect(resp.statusCode).toEqual(200)
        expect(resp.body.message).toEqual('Succesfully removed card from want list')
    })

    test("unauthorized for other users", async function () {
        const resp = await request(app)
            .delete(`/want-list/2/delete/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`)
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauthorized for anon", async function () {
        const resp = await request(app)
            .delete(`/want-list/1/delete/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`)
        expect(resp.statusCode).toEqual(401);
    })
})